from django.urls import path
# from .views import Register,Login,ImageUpload,Profile,UploadFileCustomer,UploadFileOwner,UploadProfile,AdminRegister,AdminLogin,ForgetPassword,EmailVerification,ResetPassword,ChangePassword
from .views import (
    Register,
    Login,
    Profile,
    UploadProfile,
    UploadFileCustomer,
    UploadFileOwner,
    UpdateUser,
    VehicleID,
    AdminRegister,
    AdminLogin,
    ForgetPassword,
    EmailVerification,
    ResetPassword,
    ChangePassword,
    Logout,
    DebitBalance,
    AdminViewCustomer,
    AdminViewParking,
    AdminViewPendingCustomer,
    AdminViewPendingParking,
    AdminVerifyCustomer,
    AdminVerifyParking,
    ViewCreditedPayment,
    ViewDebitedPayment,
    KhaltiTopup,
    KhaltiTopupVerification,
    ReturnURL,
)
urlpatterns = [
    path('register',Register.as_view(), name='register'),
    path('login',Login.as_view(), name='login'),
    path('profile',Profile.as_view(), name='profile'),
    path('upload/image',UploadProfile.as_view(), name='profile_image'),
    path('upload/customer/file',UploadFileCustomer.as_view(), name='file'),
    path('upload/owner/file',UploadFileOwner.as_view(), name='file'),
    path('update', UpdateUser.as_view(), name = 'update_user'),
    path('vehicleid', VehicleID.as_view(), name = 'vehicle_update'),
    path('topup', KhaltiTopup.as_view(), name = 'khalti_topup'),
    path('return_url', ReturnURL.as_view(), name = 'return_url'),
    path('topup/verify', KhaltiTopupVerification.as_view(), name = 'verify_topup'),
    path('view/credit', ViewCreditedPayment.as_view(), name = 'view_credited_balances'),
    path('view/debit', ViewDebitedPayment.as_view(), name = 'view_debited_balances'),
    # path('debit', DebitBalance.as_view(), name = 'debited_balance'),
    # path('owner',Owner.as_view(), name = 'owner'),
    # path('<usr>/upload',ImageUpload.as_view(), name='upload'),
    path('admin/signup',AdminRegister.as_view(), name = 'admin_signup'),
    path('admin/login',AdminLogin.as_view(), name = 'admin_login'),
    path('admin/view/customer', AdminViewCustomer.as_view(), name ='admin_customer_view'),
    path('admin/view/parking',AdminViewParking.as_view(), name ='admin_parking_view'),
    path('admin/view/pendingcustomer', AdminViewPendingCustomer.as_view(), name = 'admin_view_pendingcustomer' ),
    path('admin/view/pendingparking', AdminViewPendingParking.as_view(), name = 'admin_view_pendingparking'),
    path('admin/verify/customer/<id>', AdminVerifyCustomer.as_view(), name ='admin_verify_customer'),
    path('admin/verify/parking/<id>',AdminVerifyParking.as_view(), name = 'admin_verify_parking'),
    path('forgetpassword', ForgetPassword.as_view(), name='forget_password'),
    path('verify/<id>/<token>', EmailVerification.as_view(), name ='verify_email'),
    path('reset/<id>/<token>', ResetPassword.as_view(), name ='reset_password'),
    path('changepassword', ChangePassword.as_view(), name = 'change_password'),
    path('logout',Logout.as_view(), name ='logout'),
]