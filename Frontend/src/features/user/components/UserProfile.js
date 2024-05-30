import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectloggedInUser, updateUserAsync } from '../../auth/authSlice';
import { Dialog, Card, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';

const UserProfile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user=useSelector(selectloggedInUser);
  const handleDialog = () => {
    setOpenDialog(true);
  };
 
  return (
    <div className='flex flex-col overflow-hidden'>
      <main className='flex-grow bg-gray-100 py-5'>
        <div className='container mx-auto h-full flex flex-col justify-center'>
          <div className='flex justify-center items-center h-full'>
            <div className='bg-white rounded-lg shadow-md w-full md:w-1/2 lg:w-2/3'>
              <div className='flex flex-col md:flex-row'>
                <div className='bg-gradient-custom text-center text-white rounded-tl-lg rounded-bl-lg flex flex-col items-center justify-center p-4 md:w-1/3'>
                  <img
                    src={user.avatar}
                    alt='Avatar'
                    className='rounded-full w-20 h-20 mb-4'
                  /> 
                   <h5 className='text-lg'>{user.FName}{' '}{user.LName}</h5> 
                 
                  <span className='mt-5 text-gray-300 cursor-pointer'>✏️</span>
                </div>
                <div className='p-4 md:w-2/3'>
                  <h6 className='text-lg font-semibold'>Information</h6>
                  <hr className='my-4' />
                  <div className='flex flex-wrap mb-4'>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm font-medium'>Email</h6>
                      <p className="text-gray-600 sm:truncate sm:overflow-hidden sm:text-wrap break-all">{user.email}</p>

                    </div>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm  font-medium'>Phone</h6>
                      <p className='text-gray-600'>{user.phone_no}</p>
                    </div>
                  </div>
                  <h6 className='text-lg font-semibold'>More Information</h6>
                  <hr className='my-4' />
                  <div className='flex flex-wrap mb-4'>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm font-medium'>Username</h6>
                      <p className='text-gray-600'>{user.username}</p>
                    </div>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm font-medium'>Role</h6>
                      <p className='text-gray-600'>{user.role}</p>
                    </div>
                  </div>
                  <div className='flex justify-start space-x-3'>
                  <button onClick={handleDialog} className='mt-5 text-gray-300 cursor-pointer'>✏️ Update Profile</button>
                  {openDialog && <DialogDefault setOpenDialog={setOpenDialog} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function DialogDefault({ setOpenDialog }) {
   const dispatch=useDispatch();
    const [formData, setFormData] = useState({
     
      FName: '',
      LName:'',
      email: '',
      phone_no: '',
      
    });
  
    
  
    const handleConfirm = async () => {
      try {
        const result = await dispatch(updateUserAsync(formData));
    
        if (result.meta.requestStatus === 'fulfilled') {
          handleClose();
          alert("User profile updated successfully.");
        } else {
          alert("User profile was not updated.");
        }
      } catch (error) {
        console.error('Error updating user profile:', error);
        alert("An error occurred while updating the profile.");
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleClose = () => {
      setOpenDialog(false);
    };
  
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md xl:items-center xl:justify-center'>
        <Dialog
          size='xs'
          open={true}
          handler={handleClose}
          className='bg-transparent shadow-none fixed inset-0 justify-between top-[10%] -left-4 '
        >
          <Card className='mx-auto w-full max-w-[42rem]'>
            <CardBody className='flex flex-col gap-4'>
              <Typography variant='h4' color='blue-gray'>
               Update Profile
              </Typography>
  
              <Typography className='-mb-2' variant='h6'>
               First Name
              </Typography>
              <Input
                type='text'
                name='FName'
                placeholder=''
                size='lg'
                value={formData.FName}
                onChange={handleChange}
              />
              <Typography className='-mb-2' variant='h6'>
                Last Name
              </Typography>
              <Input
                type='text'
                name='LName'
                placeholder=''
                size='lg'
                value={formData.LName}
                onChange={handleChange}
              />
              <Typography className='-mb-2' variant='h6'>
                Email
              </Typography>
              <Input
                type='email'
                name='email'
                placeholder=''
                size='lg'
                value={formData.email}
                onChange={handleChange}
              />
             
              <Typography className='-mb-2' variant='h6'>
                Phone No
              </Typography>
              <Input
                type='number'
                name='phone_no'
                placeholder=''
                size='lg'
                value={formData.phone_no}
                onChange={handleChange}
              />
              
            </CardBody>
            <CardFooter className='pt-0'>
              <button
                onClick={handleConfirm}
                className='bg-red-500 text-white py-2 px-4 rounded-full hover:font-bold'
              >
                Confirm
              </button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
    );
  }
export default UserProfile;
