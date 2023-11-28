import { Notify } from 'quasar';
import { useLoginUserStore } from 'src/stores/LoginUser';
export function ErrorHandle(status,err,router){
  if(status == 401)
  {
    Notify.create({
      type: "negative",
      message: "Unauthorized",
    });
    useLoginUserStore().clearStorage()
    router.push('/')
  }
  else if(status == 400)
  {
    Notify.create({
      type: "negative",
      message: err.response.data.message,
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
