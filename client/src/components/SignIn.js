import React from 'react'
import validator from 'validator'
import axios from '../config/axios'
 

class SignIn extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errors:{
                email: '',
                login:''
                 
            },
        }
    }
 
 
    handleChange=(e)=>{
        console.log('handlechange clicked')
        const { name, value } = e.target
        let errors = this.state.errors;
        if(name=='email'){
            if(validator.isEmail(value)){
                errors.email=''
            }else{
                errors.email = "Email is not valid"
            }
        }

        this.setState({errors, [name]: value});

    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handlesubmit clicked')
        console.log(this.state)
        let valid
        if( this.state.email && this.state.password){
            valid = true
        }
  
        if(valid){
            const user = {email:this.state.email, password:this.state.password}
            axios.post('/users/signIn',user)
                .then(response=>{
                    console.log(response.data)
                    if(response.data.token){
                        localStorage.setItem('auth-login',true)
                        localStorage.setItem('auth-token',response.data.token)
                        this.props.history.push('/User')
                    }else{
                        let errors = this.state.errors
                        errors.login =  response.data
                        this.setState({errors})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
 
    render(){
        console.log('rendered', this.state.errors)
        return(
            
            <div>
                <form onSubmit={this.handleSubmit}>
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
                        {this.state.errors.login.length > 0 && 
                            <span style={{ color: 'red' }}>{this.state.errors.login}</span>}
                    </div>
                    <br/>
                    <input type="submit" value="Submit"/>
                    
                </form>
              
            </div>
        )
    }
}


export default SignIn