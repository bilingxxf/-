import { Injectable } from '@angular/core'
import { getLodop } from '../../../static/LodopFuncs.js';

@Injectable()
export class PrintService {

  constructor(
  ) { }

  // 最大轮询次数
  maxPollingNum = 30
  
  // 当前轮询次数
  currentPollingNum = 0

  // 轮序时间 / 暂时废除
  pollingTime = 500

  // while 次数上限
  whileMaxFrequency = 500

  // 是否结束打印
  printEnd:boolean = false

  // PRINT_STATUS_OK 返回的taskID集合
  taskOKArr = []

  // PRINT_STATUS_EXIST 返回的taskID集合
  taskExistArr = []

  // 上一次的 taskOKArr
  lastTaskOKArr = []

  // 上一次的 taskExistArr
  lastTaskExistArr = []

  intPos = ''

  // 是否已经在清理打印列表
  hasCleanTask = false
  
  // 获取任务idtimeout
  getTaskTimeout = null

  // timeout 时间
  taskTimeoutTime = 10000

  // 打印对象
  lodop:any

  // okTask是否返回
  hasOKReturn:boolean = true

  // existTask是否返回
  hasExistReturn:boolean = true

  /**
   * 打印构件（带logo）
   * @param {object} {
   * lodop, 打印机对象
   * logoSrc, logo路径
   * projectShortName, 项目简称
   * monomerName, 单体名称
   * cmptNo, 构件编号
   * cmptName, 构件名称
   * cmptNum, 构件数量
   * cmptWeight, 构件重量（单件）
   * cmptArea, 构件区域
   * cmptLength, 构件长度
   * cmptSpec, 构件规格
   * qrCode, 构件二维码
   * manufacturerName} 制造商名称
   * @memberof ProductService
   * @author duhh
   */
  async printComponent({projectShortName, monomerName, cmptNo, cmptName, cmptNum, cmptWeight, cmptArea, cmptLength, cmptSpec, qrCode, manufacturerName}) {
    let strHtml = 
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: left;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">${projectShortName}</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;word-break: break-all;">${ monomerName }</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 52pt;width: 180pt;" colspan="3">
                    <div style="margin-top:-8pt;">NO：</div>
                    <div style="font-size: 26pt;padding-left: 25pt;box-sizing: border-box;line-height: 16pt;font-weight:bold;">${ cmptNo }</div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">名称：${ cmptName }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">数量：${ cmptNum }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">单重(kg)：${ cmptWeight }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">规格：${ cmptSpec }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 78pt;width: 78pt;" rowspan="3">
                  <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width:100%;height:100%">
                          <div style="width:70pt;height:70pt;"></div>
                  </div>
            </td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">区域：${ cmptArea }</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">长度(m)：${ (cmptLength/1000).toFixed(3) }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;" colspan="2">${ manufacturerName }</td>
          </tr>
        </table>
      </body>
    </html>`
    let result:Boolean = false
    try {
      this.lodop = await this.getLodop();
      this.lodop.SET_PRINT_PAGESIZE (1, 1000, 680,"1"); /*纸张大小*/
      this.lodop.ADD_PRINT_HTM('5pt', '5pt',"100%","100%", strHtml);
      this.lodop.ADD_PRINT_BARCODE('120pt', '200pt', '85pt', '85pt',"QRCode", qrCode);
      // this.lodop.ADD_PRINT_BARCODE('115pt', '197pt', '85pt', '85pt',"QRCode", qrCode);
      result = await this.printHasResult()
    } catch (error) {
      console.log(error)
      result = false
    } finally {
      return result
    }
  }

   /**
   * 打印构件（带logo）
   * @param {object} {
   * lodop, 打印机对象
   * logoSrc, logo路径
   * projectShortName, 项目简称
   * monomerName, 单体名称
   * cmptNo, 构件编号
   * cmptName, 构件名称
   * cmptNum, 构件数量
   * cmptWeight, 构件重量（单件）
   * cmptArea, 构件区域
   * cmptLength, 构件长度
   * cmptSpec, 构件规格
   * qrCode, 构件二维码
   * manufacturerName} 制造商名称
   * @memberof ProductService
   * @author duhh
   */
  async printComponentHasLogo({ logoSrc, projectShortName, monomerName, cmptNo, cmptName, cmptNum, cmptWeight, cmptArea, cmptLength, cmptSpec, qrCode, manufacturerName}) {
    let strHtml = 
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: left;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="box-sizing:border-box;height: 52pt;width: 90pt;" rowspan="2">
                <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width:100%;height:100%">
                  <img src="${logoSrc}" style="width:78pt;height:78pt;">
                </div>
              </td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">${projectShortName}</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 52pt;width: 180pt;" colspan="2">
                    <div style="margin-top:-8pt;">NO：</div>
                    <div style="font-size: 26pt;padding-left: 25pt;box-sizing: border-box;line-height: 16pt;font-weight:bold;">${ cmptNo }</div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;word-break: break-all;" colspan="2">${ monomerName }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 78pt;width: 78pt;" rowspan="4">
                  <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width:100%;height:100%">
                          <div style="width:70pt;height:70pt;"></div>
                  </div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 164pt;" colspan="2">规格：${ cmptSpec }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">单重(kg)：${ cmptWeight }</td>
            <td style="padding: 0 8pt;box-sizing:border-box; word-break: break-all;height: 26pt;width: 61pt;">数量：${ cmptNum }</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">长度(m)：${ (cmptLength/1000).toFixed(3) }</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 61pt;">${ cmptArea }</td>
          </tr>
        </table>
      </body>
    </html>`
    let result:Boolean = false
    try {
      this.lodop = await this.getLodop();
      this.lodop.SET_PRINT_PAGESIZE (1, 1000, 680,"1"); /*纸张大小*/
      this.lodop.ADD_PRINT_HTM(5,5,"100%","100%", strHtml);
      this.lodop.ADD_PRINT_BARCODE(117,232,150,150,"QRCode", qrCode);
    // lodop.PREVIEW();/*打印预览*/
      result = await this.printHasResult()
    } catch (error) {
      console.log(error)
      result = false
    } finally {
      return result
    }
  }

  async printComponentByEncl({projectShortName, monomerName, cmptName, cmptNum, applicationArea, cmptColor, cmptLength, cmptSpec, qrCode, manufacturerName}) {
    let strHtml = 
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: left;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">${projectShortName}</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;word-break: break-all;">${ monomerName }</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 52pt;width: 180pt;" colspan="3">
                    <div style="font-size: 26pt;padding-left: 25pt;box-sizing: border-box;line-height: 16pt;font-weight:bold;">${ cmptName }</div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">使用部位：${ applicationArea }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;" >规格：${ cmptSpec }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">颜色：${ cmptColor }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;">数量(张)：${ cmptNum }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 78pt;width: 78pt;" rowspan="3">
                  <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width:100%;height:100%">
                          <div style="width:70pt;height:70pt;"></div>
                  </div>
            </td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;" colspan="2">长度(mm)：${ cmptLength }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;" colspan="2">${ manufacturerName }</td>
          </tr>
        </table>
      </body>
    </html>`
    let result:Boolean = false
    try {
      this.lodop = await this.getLodop();
      this.lodop.SET_PRINT_PAGESIZE (1, 1000, 680,"1"); /*纸张大小*/
      this.lodop.ADD_PRINT_HTM('5pt', '5pt',"100%","100%", strHtml);
      this.lodop.ADD_PRINT_BARCODE('115pt', '197pt', '85pt', '85pt',"QRCode", qrCode);
      this.lodop.SET_PRINT_STYLEA(0,"QRCodeVersion", 7);
      result = await this.printHasResult()
    } catch (error) {
      console.log(error)
      result = false
    } finally {
      return result
    }
  }

  async printComponentByMat({projectShortName, monomerName, cmptName, cmptNum, cmptMaterial, cmptUnit, cmptSpec, qrCode, manufacturerName}) {
    let strHtml = 
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: left;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">${projectShortName}</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;word-break: break-all;">${ monomerName }</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 52pt;width: 180pt;" colspan="3">
                    <div style="font-size: 26pt;padding-left: 25pt;box-sizing: border-box;line-height: 16pt;font-weight:bold;">${ cmptName }</div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 180pt;" colspan="2">规格：${ cmptSpec }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;" >单位：${ cmptUnit }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;" colspan="2">数量：${ cmptNum }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 78pt;width: 78pt;" rowspan="3">
                  <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width:100%;height:100%">
                          <div style="width:70pt;height:70pt;"></div>
                  </div>
            </td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;width: 90pt;" colspan="2">材质：${ cmptMaterial }</td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 26pt;" colspan="2">${ manufacturerName }</td>
          </tr>
        </table>
      </body>
    </html>`
    let result:Boolean = false
    try {
      this.lodop = await this.getLodop();
      this.lodop.SET_PRINT_PAGESIZE (1, 1000, 680,"1"); /*纸张大小*/
      this.lodop.ADD_PRINT_HTM('5pt', '5pt',"100%","100%", strHtml);
      this.lodop.ADD_PRINT_BARCODE('115pt', '197pt', '85pt', '85pt',"QRCode", qrCode);
      this.lodop.SET_PRINT_STYLEA(0,"QRCodeVersion", 7);
      result = await this.printHasResult()
    } catch (error) {
      console.log(error)
      result = false
    } finally {
      return result
    }
  }

  /**
   *包打印（带logo）
  * @param {*} { projectShortName, monomerName, packNo, packNumber, packWeight, manufacturerName, qrCode}
  * @memberof ProductService 
  * @author duhh
  */
  async printPacking({ projectShortName, monomerName, packNo, packNumber, packWeight, manufacturerName, qrCode }) {
    let strHtml = 
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: left;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 9.7mm;width: 95mm;" colspan="3">${projectShortName}</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 95mm;" colspan="3">
                    <div style="margin-top:-8pt;">NO：</div>
                    <div style="font-size: 15pt;padding-left: 25pt;box-sizing: border-box;line-height: 16pt;font-weight:bold;">${packNo}</div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 55mm;word-break: break-all;" colspan="2" rowspan="2">${ monomerName }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 30mm;width: 30mm;" rowspan="4">
            </td>
          </tr>
          <tr></tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 33mm;" rowspan="2">单重(kg)：${ packWeight }</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 22mm;" rowspan="2">数量：${ packNumber }</td>
          </tr>
          
          <tr></tr>
        </table>
      </body>
    </html>`
    let result:Boolean = false
    try {
      this.lodop = await this.getLodop();
      this.lodop.SET_PRINT_PAGESIZE (1, 1000, 679,"1"); /*纸张大小*/
      this.lodop.ADD_PRINT_HTM(5,5,"100%","100%", strHtml);
      this.lodop.ADD_PRINT_BARCODE(115,237,150,150,"QRCode", qrCode);
    // lodop.PREVIEW();/*打印预览*/
      result = await this.printHasResult()
    } catch (error) {
      console.log(error)
      result = false
    } finally {
      return result
    }
  }

  /**
   *包打印（带logo）
  * @param {*} {lodop, projectShortName, monomerName, packNo, packNumber, packWeight, manufacturerName, qrCode}
  * @memberof ProductService 
  * @author duhh
  */
  async printPackingHasLogo({ logoSrc, projectShortName, monomerName, packNo, packNumber, packWeight, manufacturerName, qrCode }) {
    let strHtml = 
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: left;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="box-sizing:border-box;width: 33mm;" rowspan="2">
                <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width:100%;height:100%">
                  <img src="${logoSrc}" style="width:78pt;height:78pt;">
                </div>
              </td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 9.7mm;width: 62mm;" colspan="2">${projectShortName}</td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 62mm;" colspan="2">
                    <div style="margin-top:-8pt;">NO：</div>
                    <div style="font-size: 15pt;padding-left: 25pt;box-sizing: border-box;line-height: 16pt;font-weight:bold;">${packNo}</div>
              </td>
          </tr>
          <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 55mm;word-break: break-all;" colspan="2" rowspan="2">${ monomerName }</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 30mm;width: 30mm;" rowspan="4">
            </td>
          </tr>
          <tr></tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 33mm;" rowspan="2">单重(kg)：${ packWeight }</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 18mm;width: 22mm;" rowspan="2">数量：${ packNumber }</td>
          </tr>
          
          <tr></tr>
        </table>
      </body>
    </html>`
    
    let result:Boolean = false
    try {
      this.lodop = await this.getLodop();
      this.lodop.SET_PRINT_PAGESIZE (1, 1000, 679,"1"); /*纸张大小*/
      this.lodop.ADD_PRINT_HTM(5,5,"100%","100%", strHtml);
      this.lodop.ADD_PRINT_BARCODE(117,232,150,150,"QRCode", qrCode);
      // lodop.PREVIEW();/*打印预览*/
      result = await this.printHasResult()
    } catch (error) {
      console.log(error)
      result = false
    } finally {
      return result
    }
  }

  // 参数初始化
  parmaInit() {
    this.printEnd = false
    this.currentPollingNum = 0
    this.lastTaskOKArr = this.taskOKArr
    this.lastTaskExistArr = this.taskExistArr
    this.taskOKArr = []
    this.taskExistArr = []
    this.hasCleanTask = false
    this.hasOKReturn = true
    this.hasExistReturn = true
  }

  // 获取LODOP对象
  getLodop() {
    return new Promise(async (resolve, reject) => {
      try{
        if(!this.lodop) {
          let LODOP:any = getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'))
          this.lodop = LODOP
        }
        let result = false;   /*初始化*/
        let whileFrequency = 0
        while(!result) {
          if(whileFrequency++ > this.whileMaxFrequency) {
            reject('PRINT_INIT-while超时')
            return
          }
          result = this.lodop.PRINT_INIT("");   /*初始化*/
          console.log('初始化----------------------------', result)
          if(!result) {
            await this.codeWait(500)
          }
        }
        this.parmaInit()
        resolve(this.lodop)
      }catch(e){
        console.log(e);
        this.download();
        reject()
      }
    })
  }

  // 下载
  download() {
    try {
      let elem = document.createElement('iframe');
      elem.src = '../../../../assets/printtool.rar';
      elem.style.display = "none";   
      document.body.appendChild(elem);  
    } catch (e) {
      console.log('下载异常');
    }
  }
  
  //清理打印任务
	controlPrinterPURGE(strJOBID){
    return new Promise(async (resolve, reject) => {
      if(this.hasCleanTask) {
        return
      }
      this.hasCleanTask = true
      console.log('清除任务')
      let strPrinterID = this.GetPrinterIDfromJOBID(strJOBID);
      if (this.lodop.CVERSION) {
        this.lodop.On_Return= (TaskID,Value) => {
          console.log("清理结果:"+Value)
          if(Value.toLowerCase() == 'ok'){
            resolve()
          }
        }
        let hasExec = false
        console.log('-----------------SET_PRINT_MODE------------------clodop')
        let whileFrequency = 0
        do {
          if(whileFrequency++ > this.whileMaxFrequency) {
            reject('SET_PRINT_MODE-while超时')
            return
          }
          if(this.lodop.blOneByone == false) {
            this.lodop.SET_PRINT_MODE("CONTROL_PRINTER:"+strPrinterID,"PURGE");
            hasExec = true
          }else{
            console.log('窗体存在--------------------延迟500:SET_PRINT_MODE-清除', this.lodop.blOneByone)
            await this.codeWait(500)
          }
        } while (this.lodop.blOneByone == true && hasExec);
        return;
      } else {
        var strResult = this.lodop.SET_PRINT_MODE("CONTROL_PRINTER:"+strPrinterID,"PURGE");
        console.log("清理结果:" + strResult);
        resolve()
      };
    })
  }
  
  //从JOB代码找出打印机序号：
	GetPrinterIDfromJOBID(strJOBID){
		var intPos = strJOBID.indexOf("_");
		if (intPos<0) {return strJOBID;} else {return strJOBID.substr(0,intPos);}
  }
  
  // 打印（带打印结果）
  async printHasResult():Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      let returnValue:any = { value: '' }
      this.lodop.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
      if (this.lodop.CVERSION) {
        let loopNum = 0
        this.lodop.On_Return = async (TaskID,Value) => {
          loopNum++
          returnValue.value = Value
          console.log('第一次ON_RETURN C-LODOP: 获取JOB代码', TaskID, Value)
          if(Value.toString().indexOf('该打印机在“云服务器工作模式”下被禁用') > -1) {
            setTimeout(() => {
              alert('请启动LODOP或C-LODOP')
            }, 500)
            resolve(false)
            return
          }
          // 某种出错的情况下停止打印
          if(loopNum > 0) {
            console.log('this.getTaskTimeout-------------',this.getTaskTimeout)
            if(this.getTaskTimeout) clearTimeout(this.getTaskTimeout)
            this.getTaskTimeout = setTimeout(async () => {
              clearTimeout(this.getTaskTimeout)
              console.log('无法获取到正确的JOB代码,并清空队列', this.intPos)
              await this.controlPrinterPURGE(this.intPos)
              resolve(false)
              return
            }, this.taskTimeoutTime)
          }
          if(this.lastTaskOKArr.indexOf(TaskID) == -1 && this.lastTaskExistArr.indexOf(TaskID) == -1) {
            // 清除task-timeout
            if(this.getTaskTimeout) clearTimeout(this.getTaskTimeout)
            // 设置打印机序号
            this.intPos = this.GetPrinterIDfromJOBID(Value);
            let _result = await this.pollingQueryRes( returnValue )
            resolve(_result)
          }
        };
        let hasExec = false
        console.log('-----------------PRINT------------------clodop')
        let whileFrequency = 0
        do {
          if(whileFrequency++ > this.whileMaxFrequency) {
            reject('PRINT-while超时')
            return
          }
          if(this.lodop.blOneByone == false) {
            this.lodop.PRINT();
            hasExec = true
          }else{
            console.log('窗体存在--------------------延迟500:PRINT', this.lodop.blOneByone)
            await this.codeWait(500)
          }
        } while (this.lodop.blOneByone == true && hasExec);
        console.log('-----------------PRINT—END------------------clodop')
      } else {
        returnValue.value = this.lodop.PRINT();
        console.log('第一次ON_RETURN LODOP: 获取JOB代码', returnValue.value)
        let _result = await this.pollingQueryRes(returnValue)
        resolve(_result)
      } 
    })
  }

  // 轮序打印结果
  pollingQueryRes(returnValue):Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      console.log('轮序接收到的JOB代码', returnValue)
        for(let i = 0; i < this.maxPollingNum; i++){
          console.log('轮询------------------------------------------', i, this.lodop.blOneByone)
          // if(this.lodop.blOneByone == false) {
            if(this.printEnd){
              resolve(true)
              return 
            }
            // 是否打印成功
            await this.getStatusValue('PRINT_STATUS_OK', returnValue.value)
            let whileFrequency = 0
            while(!this.hasOKReturn){
              if(whileFrequency++ > this.whileMaxFrequency) {
                await this.controlPrinterPURGE(returnValue.value)
                reject('等待回调-OK-while超时')
                return
              }
              console.log(`------------------等待回调-OK------------------${this.hasOKReturn},${this.hasExistReturn}`)
              await this.codeWait(500)
            }
            // 是否在队列
            await this.getStatusValue('PRINT_STATUS_EXIST', returnValue.value)
            whileFrequency = 0
            while(!this.hasExistReturn){
              if(whileFrequency++ > this.whileMaxFrequency) {
                await this.controlPrinterPURGE(returnValue.value)
                reject('等待回调-EXIST-while超时')
                return
              }
              console.log(`------------------等待回调-EXIST------------------${this.hasOKReturn},${this.hasExistReturn}`)
              await this.codeWait(500)
            }
            // 打印结果状态码
            // this.getStatusValue('PRINT_STATUS_ID', returnValue.value)
            // await this.codeWait(this.pollingTime)
          // }
        }
        await this.controlPrinterPURGE(returnValue.value)
        resolve(false)
    })
  }

  // 查询打印状态对应的值
  getStatusValue(ValueType, ValueIndex) {
    return new Promise(async (resolve, reject) => { 
      let strResult = null
      if (this.lodop.CVERSION) {
        let hasExec = false
        this.lodop.On_Return_Remain = true;
        this.lodop.On_Return=(TaskID,Value) => {
          // if(this.printEnd) return
          console.log(`任务ID：${TaskID}     任务完成ID：${this.taskOKArr}     任务队列ID：${this.taskExistArr}     结果：${Value}`)
          if(this.taskOKArr.indexOf(TaskID) > -1){
            this.hasOKReturn = true
            // 为1时打印成功（当前值可能会不准确，所以下面增加是否在队列中的判断）
            if (+Value === 1){
              console.log('------------------打印成功------------------')
              this.printEnd = true
            }
          } else if (this.taskExistArr.indexOf(TaskID) > -1) {
            this.hasExistReturn = true
            if (+Value === 0){
              console.log('------------------已出队列------------------')
              this.printEnd = true
            }
          } else {
            this.hasOKReturn = true
            this.hasExistReturn = true
            console.log('-----------------不匹配情况-----------------', Value)
          }
        }
        console.log(`------------------GET_VALUE------------------${ValueType}`)
        let whileFrequency = 0
        do {
          if(whileFrequency++ > this.whileMaxFrequency) {
            await this.controlPrinterPURGE(ValueIndex)
            reject('GET_VALUE-while超时')
            return
          }
          if(this.lodop.blOneByone == false) {
            strResult= this.lodop.GET_VALUE(ValueType,ValueIndex)
            hasExec = true
          }else{
            console.log('窗体存在--------------------延迟500:GET_VALUE', this.lodop.blOneByone)
            await this.codeWait(500)
          }
        } while (this.lodop.blOneByone == true && hasExec);
        console.log(`------------------GET_VALUE-END------------------`)
        if(ValueType === 'PRINT_STATUS_OK') {
          this.hasOKReturn = false
          this.taskOKArr.push(strResult)
        }
        if(ValueType === 'PRINT_STATUS_EXIST') {
          this.hasExistReturn = false
          this.taskExistArr.push(strResult)
        }
      }
      
      // LODOP 的情况
      if (!this.lodop.CVERSION) {
        console.log('------------------GET_VALUE------------------lodop')
        strResult = this.lodop.GET_VALUE(ValueType,ValueIndex)
        if(ValueType === 'PRINT_STATUS_OK') {
          this.hasOKReturn = false
          console.log('OK-------------------', strResult)
          if (strResult){
            this.printEnd = true
            this.hasOKReturn = true
          }
        }
        if(ValueType === 'PRINT_STATUS_EXIST') {
          this.hasExistReturn = false
          console.log('EXIST-------------------', strResult)
          if (!strResult && this.currentPollingNum > 0){
            this.printEnd = true
            this.hasExistReturn = true
          }
        }
      }
      resolve()
    })
  }

  getStatuMessage(statusID) { 
		var messages="";
		if (statusID & 1) messages += "已暂停 -";
		if (statusID & 2) messages += "错误 -";
		if (statusID & 4) messages += "正删除 -";
		if (statusID & 8) messages += "进入队列 -";
		if (statusID & 16) messages += "正在打印 -";
		if (statusID & 32) messages += "脱机 -";
		if (statusID & 64) messages += "缺纸 -";
		if (statusID & 128) messages += "打印结束 -";
		if (statusID & 256) messages += "已删除 -";
		if (statusID & 512) messages += "堵了 -";
		if (statusID & 1024) messages += "用户介入 -";
		if (statusID & 2048) messages += "正在重新启动 -";
		return messages;
  }
  
  // 等待
  codeWait(time) {
    return new Promise((resolve, reject) => { 
      setTimeout(() => {
        resolve()
      }, time);
    })
  }
}
