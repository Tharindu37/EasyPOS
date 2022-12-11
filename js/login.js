const users = [{
    name: 'nimal',
    password: '123',
    avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=360&t=st=1670622823~exp=1670623423~hmac=e40ad0bf059402685f3241ab4be877271607eef86b60e5b2d44a7a61a96d7922'
},
    {
        name: 'kamal',
        password: '1234',
        avatar: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360&t=st=1670622850~exp=1670623450~hmac=4a1714dacabdcbff32e679344efb3c72c1298a21526ceff872220e764eea523e'
    }];
const login=()=>{
    let userName=$('#userName').val();
    let password=$('#password').val();
    if (userName.trim().length!==0 || password.trim().length!==0){
        for (const tempUser of users){
            if (tempUser.name===userName){
                //check password
                if (tempUser.password===password){
                    //login
                    localStorage.setItem('user',JSON.stringify({
                        name:userName,
                        avatar:tempUser.avatar
                    }));
                    //navigate to the dashboard
                    window.location.href='pages/dashboard.html';
                    return;

                }else {
                    alert('password is incorrect!')
                    return;
                }
            }
        }
        alert('username is incorrect!')
    }else {
        alert('username or password is required!')
    }
}