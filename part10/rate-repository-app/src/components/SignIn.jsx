import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';

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
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
