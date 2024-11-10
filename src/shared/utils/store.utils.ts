export enum ReducerPrefixes {
    users = 'users',
    orders = 'orders',
    auth = 'auth',
  }
  
  export const sharedSelectors: any = {
  }
  
  export const sharedActionTypes: any = {
  }
  
  export const sharedActions: any = {
  }
  
  class StoreInstance {
    private store: any
  
    getInstance() {
      return this.store
    }
  
    setInstance(store: any) {
      return (this.store = store)
    }
  }
  
  export const storeInstance = new StoreInstance()
  