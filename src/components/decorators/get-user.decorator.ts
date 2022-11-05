import{createParamDecorator} from '@nestjs/common'
import { User } from 'src/typeorm'
export const GetUser = createParamDecorator((req,data):User =>req.user)