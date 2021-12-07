export default function prettifyError(errors: any) {
    const errorMsg = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const errMsg = errors[key];
        for (let i = 0; i < errMsg.length; i++) {
          errorMsg.push(`${key}: ${errMsg[i]}`);
        }
      }
    }
    return errorMsg;
  }
  