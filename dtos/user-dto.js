//data transfer objects
class UserDto  {
    id;
    firstName;
    lastName;
    email;
    role;
     constructor(model){
        this.id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.email = model.email;
        this.role = model.role;
     }
}

export default UserDto;