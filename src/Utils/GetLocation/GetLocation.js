export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject("تم رفض الوصول للموقع يمكنك ادخال الموقع كنص");
              break;
            case error.POSITION_UNAVAILABLE:
              reject("لا يمكننا الوصول للموقع");
              break;
            case error.TIMEOUT:
              reject("انترنت ضعيف");
              break;
            case error.UNKNOWN_ERROR:
              reject("لا يمكننا الوصول للموقع الرجاء ادخال الموقع يدويا");
              break;
          }
        }
      );
    } else {
      reject("هاتفك لا يدعم الوصول للموقع");
    }
  });
}
