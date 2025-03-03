import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
      
    const token = localStorage.getItem("token");
    // const headers = new HttpHeaders().set("authorization","Bearer" + token);



    // req.headers.append("authorization","Bearer " + token);
       
    
    const clonedRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
//   return next(req);
    return next(clonedRequest);
};
