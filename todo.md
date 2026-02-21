# TODO

## Modules

- [ ] Auth
- [ ] User
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
- [ ] service
    - [ ] create new user
    - [ ] get all users
    - [X] get an user by id
    - [X] update an user
    - [X] delete an user
    - [ ] reset user's password

- [ ] views
    - [X] me
        - [X] view profile
        - [X] update profile
        - [X] delete me
    - [ ] admin
        - [ ] list users
        - [ ] create new user
        - [ ] view user's profile
        - [ ] update user's profile
        - [ ] delete an user
        - [ ] reset user's password
