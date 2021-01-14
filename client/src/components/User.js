import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../config/axios'

class User extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            id:''
        }
    }
    componentDidMount(){
        console.log('component did mount')
        const token = localStorage.getItem('auth-token')
        if( token && localStorage.getItem('auth-login')){
            axios.get('/users/details',{
                headers:{
                    Authorization:token
                }
            })
                .then(response=>{
                    console.log(response.data)
                    this.setState({user:response.data})
                     
                })
                .catch(err=>{
                    console.log(err)
                    this.props.history.push('/SignIn')
                })
            
        }else{
            this.props.history.push('/SignIn')
        }
 
    }
 
    render(){
        console.log('rendered', this.state)
        return(
            <div>
                <br/>{this.state.user.username}
                <br/>{this.state.user.email}
                <br/>{this.state.user.phone}
            </div>
        )
            
    }
}

export default User