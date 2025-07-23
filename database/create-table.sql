-- Create table user ===============
create table master_user(u_id int, u_name varchar(50), u_email varchar(50), u_mobile varchar(10), u_city varchar(50), u_image text, u_user int);

-- create table for login --- 
create table user_info(uinfo_srno int primary key, uinfo_First_name varchar(100), uinfo_last_name varchar(100), uinfo_email varchar(100), uinfo_password varchar(15), uinfo_confirm_password varchar(15), uinfo_status smallint);