import bcrypt from "bcrypt";

const password = "1234567";

bcrypt.hash(password, 10).then(hash => {
  console.log(hash);
});