CREATE PROCEDURE [dbo].[sp_obtener_usuarios]
AS 
	BEGIN
		SELECT 
			id_usuario, 
			id_rol, 
			usuario, 
			cui, 
			nombres, 
			apellidos
		FROM 
			tc_usuario
		WHERE	
			estado_registro = 1
		;
	END;