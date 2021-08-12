import { useState } from 'react';
import isEmpty from 'lodash/isEmpty';

//@flow
/* eslint no-unused-vars:*/

export default function useForm(
  initialValues: { [string]: any },
  validationSchema: { [string]: Function }
) {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const onChangeHandler =
    (key: string) =>
    ({ target }: Object) => {
      setFormValues((state) => ({ ...state, [key]: target?.value }));
    };

  const getValidationResult = (key: string, value: any): ?string => {
    return validationSchema[key] && validationSchema[key](value);
  };

  const validate =
    (key: string, val: any) =>
    (event: Object): void => {
      const value = val || event?.target?.value || formValues[key];
      const ValidationResult = getValidationResult(key, value);

      if (ValidationResult) {
        setErrors({
          ...errors,
          [key]: ValidationResult,
        });
      } else {
        const { [key]: _omit, ...rest } = errors;
        setErrors(rest);
      }
    };

  const validateOnSubmit = (): { [string]: any } => {
    return Object.keys(formValues).reduce((acc, cur) => {
      const ValidationResult = getValidationResult(cur, formValues[cur]);
      return ValidationResult ? { ...acc, [cur]: ValidationResult } : acc;
    }, {});
  };

  const submitForm = (cb: Function): void => {
    const errorResult = validateOnSubmit();
    setErrors(errorResult);

    if (isEmpty(errorResult)) {
      cb(formValues);
    }
  };

  return { formValues, onChangeHandler, errors, submitForm, validate };
}
