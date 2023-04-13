## membuat Social Network RESTful API dengan nodeJS (expressJS) & mysql

### terlebih dahulu anda harus menginstall mysql & Node Package Manager di laptop/komputer anda

tutorial cara run servernya:
1. jalan kan server mysql di laptop/komputer anda, kemudian buat database dengan nama "mern_sosmed"
2. download repositori ini, kemudian ekstrak di laptop/komputer anda
3. buka terminal atau cmd anda kemudian masuk ke dalam project folder nya (hasil dr ekstrak tadi)
4. install node modules dependency nya dengan cara mengetikkan **npm install** di dalam terminal/cmd, tunggu sampai selesai
5. generate tabel dengan cara mengetikan **npx sequelize-cli db:migrate** di dalam terminal/cmd
6. jalankan server dengan mengetikkan **npm start** di dalam terminal
7. gunakan postman untuk menjalan kan program nya. atau jika tidak ingin menggunakan postman, gunakan client side (front end) reactJS server yg juga sudah saya buat untuk menjalankan program nya [link disini](https://github.com/tembik/client_sosnet)