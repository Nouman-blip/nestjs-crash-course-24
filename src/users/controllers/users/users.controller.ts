import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { createUserDto } from 'src/users/dtos/userData.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    //Get decorator
    @Get()
    @UseGuards(AuthGuard)
    getUsers(){
        return this.userService.fetchUsers();
    }

    @Get('posts')
    getPosts(){
        return {
            userName:'Nouman',
            email:'noumankhannoul@gmail.com',
            posts:[
                {
                    id:1,
                    title:'Post1'
                },
                {
                    id:2,
                    title:'Post2'
                }
            ]
        }

    }

    @Get('posts/comments')
    getPostsComments(){
        return [
                {
                    id:1,
                    title:'Post1',
                    comments: []
                }
            
        ]

    }

    //Post Decorator

    @Post()
    createUser(@Req() request:Request, @Res() response:Response){
        console.log(request.body)
        response.send('Created')

    }

    //Request Bodies @ DTOs[Data Transfer Object] make user provide username email
    
    @Post('create')
    @UsePipes(new ValidationPipe())
    createUserDto(@Body(ValidateCreateUserPipe) userData:createUserDto){
        console.log(userData.age.toPrecision());
        return this.userService.createUsers(userData);
        
    }


    //Route Params


    //By express way
    // @Get(':id')
    // getUserById(@Req() request:Request,@Res() response:Response){
    //     console.log(request.params);
    //     response.send('')

    // }
    @Get(':id')
    getUserById(@Param('id',ParseIntPipe) id:number){
        const user=this.userService.fetchUserById(id);

        if(!user)
         throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
        return user;
    }

    //By pure Nest Js @Params Decorator
    @Get(':id/:postId')
    getUserById_Post(@Param('id') id:string,@Param('postId') postId:string){
        console.log(id, postId);
        return {id,postId}

    }
    

    //Query Params 

    // @Get()
    // getUsers(@Query('sortDesc',ParseBoolPipe) sortDesc:Boolean){

    //     console.log(sortDesc)
    //     return{
    //         userName:'Nouman',
    //         email:'noumankhannoul@gmail.com'
    //     }
    // }

    
   

}
