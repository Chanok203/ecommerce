# TODO

## Modules

- [X] Auth
- [X] User
- [X] Flash Message
- [ ] Topup
    - [X] User Create Topup Request
- [ ] Notification
- [ ] Admin
- [ ] Wallet
- [ ] Product
- [ ] Cart
- [ ] Order
- [ ] Shipment
- [ ] Upload

### Utils
- [x] hash function (2026-02-07)

### Auth

- [X] service
    - [X] login
    - [X] register
- [X] session
- [X] middleware
    - [X] requireAuth
    - [X] requireAdmin
- [X] views
    - [X] register
    - [X] login
    - [X] logout

### User (Admin, Customer) isAdmin = true, false
- [X] model
    - [X] User
    - [X] BasicAuth
- [X] seed for admin
- [x] multer for upload
- [X] service
    - [X] create new user (auth.service.register)
    - [X] get all users (findAll)
    - [X] get an user by id
    - [X] update an user
    - [X] delete an user

- [X] views
    - [X] me
        - [X] view profile
        - [X] update profile
        - [X] delete me
    - [X] admin
        - [X] list users
        - [X] create new user
        - [X] view user's profile
        - [X] update user's profile
        - [X] delete an user


### Topup (เติมเงิน)

- user อัพโหลดรูปการโอนเงินเข้ามา
- admin ตรวจสอบรูป
    - ถ้าสำเร็จ admin เพิ่มเงินให้ user หรือกด approve
    - ถ้าไม่สำเร็จ admin กด reject
