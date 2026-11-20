import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 15,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginTop: -10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;
  const passwordConfirmationError =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, usernameError && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {usernameError && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {passwordError && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[styles.input, passwordConfirmationError && styles.inputError]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {passwordConfirmationError && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: { username, password },
        },
      });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
