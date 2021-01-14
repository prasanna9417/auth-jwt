import React from 'react'
import validator from 'validator'
import axios from '../config/axios'
 
 

class SignUp extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:'',
            phone:'',
            errors:{
                username: '', 
                email: '',
                password:'',
                phone: '',
            },
        }
    }
 
 
    handleChange=(e)=>{
        console.log('handlechange clicked')
        const { name, value } = e.target
        let errors = this.state.errors;
        switch (name) {
            case 'username': 
                errors.username = 
                isNaN(value) 
                    ?   value.length < 5 ? 'Name must be 5 characters long!' : ''
                    : 'Name must be string'
                break;
            case 'email': 
                errors.email = 
                validator.isEmail(value) 
                    ? ''
                    : 'Email is not valid!';
                break;
            case 'password': 
                errors.password = 
                value.trim().length < 6
                    ? 'Password must be 6 characters long and no whitespaces allowed!'
                    : '';
                break;
            case 'phone': 
                errors.phone = 
                isNaN(value) 
                    ? 'mobile must number!'
                    : value.length < 10 || value.length > 10 ? 'mobile must 10 digit!' : ''
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});

    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handlesubmit clicked')
        console.log(this.state)
        let valid
        if(this.state.username && this.state.email && this.state.password && this.state.phone){
            valid = true
        }
        const errors= this.state.errors
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        )
        if(valid){
            const user = {username:this.state.username, email:this.state.email, password:this.state.password, phone:this.state.phone}
            axios.post('/users/signup',user)
                .then(response=>{
                    console.log(response.data)
                    if(response.data.username){
                        const userSignIn = {email:user.email, password:user.password}
                        axios.post('/users/signIn',userSignIn)
                            .then(response=>{
                                console.log(response.data)
                                localStorage.setItem('auth-login',true)
                                localStorage.setItem('auth-token',response.data.token)
                                this.props.history.push('/User')
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
 
    render(){
        console.log('rendered', this.state)
        return(
            
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>          
                        <label htmlFor="username">
                            username
                        </label>
                        <br/>
                        <input type='text' name='username' onChange={this.handleChange}/>
                        <br/>
                        {this.state.errors.username.length > 0 && 
                        <span style={{ color: 'red' }}>{this.state.errors.username}</span>}
                    </div>
                   
                    <br/>
                    <div>
                        <label htmlFor="email">
                            email
                        </label>
                        <br/>
                        <input type='text' name='email' onChange={this.handleChange}/>
                        <br/>
                        {this.state.errors.email.length > 0 && 
                        <span style={{ color: 'red' }}>{this.state.errors.email}</span>}
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="password">
                            password
                        </label>
                        <br/>
                        <input type='password' name='password' onChange={this.handleChange}/>
                        <br/>
                        {this.state.errors.password.length > 0 && 
                        <span style={{ color: 'red' }}>{this.state.errors.password}</span>}
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="phone">
                            phone
                        <br/>
                        </label>
                        <input type='text' name='phone' onChange={this.handleChange}/>
                        <br/>
                        {this.state.errors.phone.length > 0 && 
                        <span style={{ color: 'red' }}>{this.state.errors.phone}</span>}
                    </div>
                    <br/>
                    <input type="submit" value="Submit"/>
                    
                </form>
            </div>
        )
    }
}


export default SignUp