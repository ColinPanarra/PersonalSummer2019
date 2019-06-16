/// movement and angle indicators. WASD master race

	if keyboard_check(ord("W"))	y = y-6; 
	if keyboard_check(ord("A"))	x = x-6; 
	if keyboard_check(ord("S"))	y = y+6; 
	if keyboard_check(ord("D"))	x = x+6; 

	image_angle = point_direction(x,y, mouse_x, mouse_y);


//pew pew shooting time

	if (mouse_check_button(mb_left)) && (cooldown <1)
{
	instance_create_layer(x,y,"Bullet_layer", obj_bullet); 
	cooldown=10; 
} 
cooldown=cooldown-1; 
	
