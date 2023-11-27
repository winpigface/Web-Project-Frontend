import { useLoginUserStore } from 'src/stores/LoginUser';
import { Notify } from 'quasar';

export function ErrorHandle(status,err,router){
  if(status == 401)
  {
    Notify.create({
      type: "negative",
      message: "Unauthorized",
    });
    router.push('/')
  }
  else if(status == 400)
  {
    Notify.create({
      type: "negative",
      message: "Invalid request",
    });
  }
  else
  {
    Notify.create({
      type: "negative",
      message: err.message,
    });
  }
}
