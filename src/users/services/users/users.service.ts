import { Injectable } from '@nestjs/common';
import { createUserType } from 'src/users/utils/types';

@Injectable()
export class UsersService {
    private Fakeusers=[{username:'Nouman',email:'nomi@gmail.com'},
                    {username:'haider',email:'hai@gmail.com'}
                   ]

    fetchUsers(){
        return this.Fakeusers;
    }

    createUsers(userDetails:createUserType){
        return this.Fakeusers.push(userDetails)
        
    }

    fetchUserById(id:number){
        return {id,username:'ali',email:'ali@gmail.com'}

    }
}
