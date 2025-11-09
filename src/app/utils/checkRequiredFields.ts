  export function checkRequiredFields({ body }: { body: any }) {
    const requiredFields = ['username', 'age', 'hobbies'];
    return Object.keys(body).every((field) => {
      requiredFields.includes(field);
    });
  }