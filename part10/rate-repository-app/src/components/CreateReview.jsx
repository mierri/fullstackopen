import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number between 0 and 100')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerNameError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingError = formik.touched.rating && formik.errors.rating;
  const textError = formik.touched.text && formik.errors.text;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ownerNameError && styles.inputError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {ownerNameError && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[styles.input, repositoryNameError && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {repositoryNameError && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[styles.input, ratingError && styles.inputError]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {ratingError && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input, textError && styles.inputError]}
        placeholder="Review"
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
      />
      {textError && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
