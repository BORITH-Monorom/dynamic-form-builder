export const startViewTransition = (callback: () => void) =>{
  if (!document.startViewTransition) {
    console.log('startViewTransition not supported')
    callback();
    return;
  }else{
    document.startViewTransition(callback);
  }
}
