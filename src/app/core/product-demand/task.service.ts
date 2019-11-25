import { Injectable } from '@angular/core'
import { UtilService } from '@core/util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { BehaviorSubject } from 'rxjs';
import { TaskDto } from '@core/product-demand/task-dto'


@Injectable()
export class TaskService {
    tasks: any[] = [];
    visible$ = new BehaviorSubject<boolean>(false)
    boxes$ = new BehaviorSubject<any[]>([])


    constructor(
        private utilService: UtilService,
        private http: HttpClientService
    ) { }

      //保存任务

      addplan1(item: TaskDto) {
        const _task = this.tasks.find(val => {
            return val.productionLineId === item.productionLineId && val.deadline === item.deadline && val.productId === item.productId
        })
        if(_task) {
          _task.needQuantity += item.needQuantity
          _task.name = item.name
        }else{
          this.tasks.push(item);
        }
        
        console.log('_task------------------',_task)
        // if (plan && plan.current !== item.current) {
        //     plan.quantity += item.quantity;
        //     this.visible$.next(true);
        // } else if (!plan) {
        //     this.plans.push(item);
        //     this.visible$.next(true);
        // }
        // this.tasks.push(item);
        console.log(this.tasks)
        this.visible$.next(true);
      }
}
