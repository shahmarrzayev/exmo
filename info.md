### Controllers
Burada her bir controller-a mexsus requestler gosterilib. 
Istifadechinin gonderdiyi object-i Dto ile, databese-a save 
olunan ve istifadechiye gonderilen melumatlari ise entity 
ile gosterilib. Api-i hem heroku-da hem de ec2(aws)-de 
qaldirmisham, database-i de rds(aws)-e qoshmusham.

##### AuthController
1. sendVerificationCode - nomreye kod gonderilir.
body(request): {phoneNumber}
response: {verificationCodeExpDate}

2. login - hesaba daxil olur, access_token qaytarir.
body(request): {phoneNumber, verificationCode}
response: {access_token}


##### UserController
1. getProfile - user-in profile melumatlarini qaytarir.
body(request): {}
response: {UserEntity}

2. update - userin profile melumatlarini update edir.
body(request): {UserDto}
response: {UserEntity}


##### RoleController
1. create - role yaradir.
body(request): {RoleDto}
response: {RoleEntity}

2. getAll - butun role-lari qaytarir.
body(request): {}
response: {RoleEntity[]}

3. update - role-u update edir.
body(request): {RoleDto}
response: {RoleEntity}


##### PermissionController
1. create - permission yaradir.
body(request): {PermissionDto}
response: {PermissionEntity}

2. getAll - butun permission-lari qaytarir.
body(request): {}
response: {PermissionEntity[]}

3. update - permission-u update edir.
body(request): {PermissionDto}
response: {PermissionEntity}


##### S3Controller
1. uploadFile - s3-e file upload etmek uchun istifade olunur.
body(request): file
response: {url}


##### MessageController
1. craete - message yaradir.
body(request): {MessageDto}
response: {MessageEntity}

2. update - message-i update edir.
body(request): {MessageDto}
response: {MessageEntity}


##### RoomController
1. getAll - butun roomlari qaytarir.
body(request): {RoomDto}
response: {RoomEntity[]}

2. getById - id-e gore room-u qaytarir.
body(request): {id}
response: {RoomEntity}


### Migrations
1. CreatePermissionsAndRolesTables - roles ve permissions table-ni yaradir.
2. CreateRoomsAndMessagesTables - rooms ve messages table-ni yaradir.

### Entities
Database uchun PostgreSQL istifade olunub. 
Burada her table-in columnlari qeyd olunub.

UserEntity: {
  id,
  first_name,
  last_name,
  phone_number,
  username,
  birth_date,
  last_seen,
  gender,
  latitude,
  longitude,
  is_active,
  is_user,
  blocked_list,
  image,
  refferalCode,
  verificationCode,
  verificationCodeExpDate,
  created_at,
  updated_at
}

RoleEntity: {
  id,
  title,
  [permissions: PermissionEntity]  # relation
  created_at,
  updated_at
}

PermissionEntity: {
  id,
  title,
  created_at,
  updated_at
}

MessageEntity: {
  id,
  message,
  from,
  to,
  media_url,
  is_read,
  deleted_by,
  created_at,
  updated_at
}

RoomEntity: {
  id,
  from,
  to,
  is_deleted,
  created_at,
  updated_at
}

