import { Injectable } from '@nestjs/common';
import { Customer } from '../../types/Customer';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {

  private customers: Customer[] =[{
            id: 1,
            email:'danny@gmail.com',
            name:'Danny Danny',
          },{
            id: 2,
            email:'adam@gmail.com',
            name:'Adam Adam',
           
          },{
            id: 3,
            email:'spencer@gmail.com',
            name:'Spencer Spencer',
            
          },
        ];
    findCustomerById(id: number){
      return this.customers.find((user) => user.id === id);
  }
    createCustomer(customerDto:CreateCustomerDto){
      this.customers.push(customerDto);
    }
    getCustomers(){
      return this.customers;
    }
}
