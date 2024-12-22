import validator from "validator";

interface IIsEmpty {
  value: string;
  min?: number;
  max?: number;
}

interface IVerifier {
  isEmail: (email: string) => boolean;
  isEmpty: (props: IIsEmpty) => boolean;
  isPhoneNumberString: (value: string) => boolean;
}

export class Verifier implements IVerifier {
  isEmail(email: string): boolean {
    return validator.isEmail(email);
  }

  isEmpty({ value, min, max }: IIsEmpty): boolean {
    if (validator.isEmpty(value)) {
      return true;
    }

    if (min !== undefined && value.length < min) {
      return true;
    }
    if (max !== undefined && value.length > max) {
      return true;
    }

    return false;
  }
  isPhoneNumberString(value: string): boolean {
    return validator.isNumeric(value) && /^[0-9]{8}$/.test(value);
  }

  isAdult(birthdate: Date | string): boolean {
    const birthDateObj =
      typeof birthdate === "string" ? new Date(birthdate) : birthdate;

    if (!(birthDateObj instanceof Date) || isNaN(birthDateObj.getTime())) {
      throw new Error("La fecha de nacimiento no es válida");
    }

    const today = new Date();

    const age = today.getFullYear() - birthDateObj.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() &&
        today.getDate() >= birthDateObj.getDate());

    return hasHadBirthdayThisYear ? age >= 18 : age - 1 >= 18;
  }
}
