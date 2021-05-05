

export function asynEmailCheck(
  field = 'field',
  required?: boolean
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s0-9]*$/;
    if (!control.value && !required) {
      return null;
    } else if (!control.value && required) {
      return {
        required: `${field}_is_required`
      };
    } else if (
      !reg.test(control.value) ||
      control.value.length < 10 ||
      control.value.length > 14
    ) {
      return { phone: `invalid_${field}` };
    }
  };
}
