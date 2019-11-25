import { HttpClientService } from './http-client/http-client.service'
import { UserService } from '@core/user/user.service'
import { UtilService } from './util/util.service'
import { FileService } from '@core/file/file.service'
import { ProjectService } from './project/project.service'
import { PermissionService } from './permission/permission.service'
import { EnterpriseService } from './enterprise/enterprise.service'
import { RoleService } from '@core/role/role.service'
import { DepartmentService } from './department/department.service'
import { SystemUserService } from '@core/system-user/system-user.service'
import { LocationService } from './location/location.service'
import { MonomerService } from './monomer/monomer.service'
import { PaymentRemindService } from '@core/payment-remind/payment-remind.service'
import { ProjectWorkloadService } from '@core/project-workload/project-workload.service'
import { PlanService } from './plan/plan.service'
import { TaskService } from './product-demand/task.service'
import { ProductService } from './product/product.service'
import { SubcontractorService } from '@core/subcontractor/subcontractor.service'
import { WarehousingService } from './warehousing/warehousing.service'
import { WarehouseOutService } from './warehouse-out/warehouse-out.service'
import { ProductSubcontractService } from '@core/product-subcontract/product-subcontract.service'
import { SupportMaterialService } from './support-material/support-material.service'
import { CargoListService } from './cargo-list/cargo-list.service'
import { ConstructionLogService } from '@core/construction-log/construction-log.service'
import { ProblemService } from '@core/problem/problem.service'
import { ProductDemandService } from './product-demand/product-demand.service'
import { TotalPregressService } from './total-progress/total-pregress.service'
import { WarehousingFixStaticService } from './warehousing-fix-static/warehousing-fix-static.service'
import { ContactLetterService } from './contact-letter/contact-letter.service'
import { InspectionsService } from '@core/inspections/inspections.service'
import { FixPlanService } from './fix-plan/fix-plan.service'
import { SecurityLogService } from '@core/security-log/security-log.service'
import { InvoiceService } from './invoice/invoice.service'
import { EnclosureService } from '@core/enclosure/enclosure.service'
import { CompanyService } from './company/company.service'
import { ProductivityService } from './productivity/productivity.service'
import { RiskControlService } from '@core/risk-control/risk-control.service'
import { QualityAndSecurityService } from './quality-and-security/quality-and-security.service'
import { ProjectEvaluationService } from '@core/project-evaluation/project-evaluation.service'
import { ApprovalService } from './approval/approval.service'
import { ProjectStepBarChartService } from './setp-bar-chart/project-step-bar-chart.service';
import { QualitySecurityService } from './quality-and-security/quality-security.service'
import { PackingListService } from './packing-list/packing-list.service'
import { PrintService } from './print/print.service'
import { LogisticsService } from './logistics/logistics.service'
import { SupplieService } from './supplie/supplie.service'

export const SERVICES = [
    HttpClientService,
    UserService,
    UtilService,
    FileService,
    ProjectService,
    PermissionService,
    EnterpriseService,
    RoleService,
    DepartmentService,
    SystemUserService,
    LocationService,
    MonomerService,
    PaymentRemindService,
    ProjectWorkloadService,
    PlanService,
    TaskService,
    ProductService,
    SubcontractorService,
    WarehousingService,
    WarehouseOutService,
    ProductSubcontractService,
    SupportMaterialService,
    CargoListService,
    ConstructionLogService,
    ProblemService,
    ProductDemandService,
    TotalPregressService,
    WarehousingFixStaticService,
    ContactLetterService,
    InspectionsService,
    FixPlanService,
    SecurityLogService,
    InvoiceService,
    EnclosureService,
    CompanyService,
    ProductivityService,
    RiskControlService,
    QualityAndSecurityService,
    ProjectEvaluationService,
    ApprovalService,
    ProjectStepBarChartService,
    PackingListService,
    QualitySecurityService,
    PrintService,
    LogisticsService,
    SupplieService
]
