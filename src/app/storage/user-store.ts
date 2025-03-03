import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { UserModel } from "../models/user.model";
import { computed } from "@angular/core";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { environment } from "../../environments/environment";


export type UserState = {
    user: UserModel;
};

const initialState: UserState = {
    user: null
};

export const UserStore = signalStore(
    {providedIn: "root"},
    withState(initialState), 

    withMethods(store => ({

        initUser(user : UserModel): void {
            patchState(store, currentState => ({ user }));
        },
        
        logoutUser(): void {
            patchState(store, currentState => ({ user: null as UserModel}))
        },
        
    })),

    withComputed(store => ({
        fullName: computed(()=> `${store.user()?.firstName} ${store.user()?.lastName}`) 
    })),

    environment.isDevelopment && withDevtools("UserStore")
);