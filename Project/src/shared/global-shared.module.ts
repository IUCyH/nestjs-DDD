import { Module, Global } from "@nestjs/common";
import { TypeHelperService } from "./type-helper.service";

@Global()
@Module({
    providers: [TypeHelperService],
    exports: [TypeHelperService]
})
export class GlobalSharedModule {}