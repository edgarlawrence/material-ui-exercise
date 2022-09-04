import React, { useState } from 'react'
import { Box } from '@mui/system'
import { TextField, DialogTitle, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  user: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  pass: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});


export default function Login() {
    // const [user, setUser] = useState('')
    // const [pass, setPass] = useState('')

    // const submitted = () => {
    //     console.log('RESULTSSSSSSS', user, pass)
    // }

    const formik = useFormik({
      initialValues: {
        user: 'foobar@example.com',
        pass: 'foobar',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <Box 
        component='div'
        sx={{ m: 10 }}
        className='Login'    
    >
        <DialogTitle sx={{ textAlign: 'center' }}> Login </DialogTitle>
        <Box
            component='div'
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        id="user"
                        name='user'
                        label="Username"
                        variant="outlined"
                        type='email'
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        error={formik.touched.user && Boolean(formik.errors.user)}
                        helperText={formik.touched.user && formik.errors.user}
                    />
                    <TextField
                        fullWidth
                        sx={{ m: 2 }}
                        id="pass"
                        name='pass'
                        label="Password"
                        variant="outlined"
                        type='password'
                        value={formik.values.pass}
                        onChange={formik.handleChange}
                        error={formik.touched.pass && Boolean(formik.errors.pass)}
                        helperText={formik.touched.pass && formik.errors.pass}
                    />
              <Button color="primary" variant="contained" fullWidth type="submit"> Log In </Button>
            </form>
        </Box>
    </Box>
  )
}
