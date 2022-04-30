CREATE PROCEDURE [dbo].[sp_registrar_usuario] 
	@id_rol INT,
	@usuario VARCHAR(50),
	@cui NUMERIC,
	@nombres VARCHAR(50),
	@apellidos VARCHAR(50),
	@password VARCHAR(255),
	@id_usuario_ingreso INT
AS 
	BEGIN
		BEGIN TRY 
		
			DECLARE  @@id_usuario INT;
	
			SELECT
				@@id_usuario = id_usuario
			FROM
				tc_usuario
			WHERE 
				usuario = @usuario AND 
				estado_registro = 1
			;
		
			IF @@id_usuario IS NULL 
				BEGIN
					
					BEGIN TRANSACTION;
					INSERT INTO tc_usuario (
						id_rol, 
						usuario, 
						cui, 
						nombres, 
						apellidos, 
						password, 
						id_usuario_ingreso, 
						estado_registro, 
						fecha_insert, 
						sesion_activa
					) VALUES (
						@id_rol,
						@usuario,
						@cui,
						@nombres,
						@apellidos,
						@password,
						@id_usuario_ingreso,
						1,
						GETDATE(),
						NULL
					);
					COMMIT TRANSACTION;
				
					SELECT 'Usuario registrado correctamente.' AS msg, 	'ok' AS 'result';
					RETURN
				END
			ELSE
				BEGIN
					SELECT 'Nombre de usuario ya ha sido utilizado.' AS msg, 	'ok' AS 'result';
					RETURN
			END
			
		END TRY 
		BEGIN CATCH 
		
			ROLLBACK TRANSACTION;
		
			SELECT 'error' AS 'result', ERROR_MESSAGE() AS msg;
			RETURN
		END CATCH;

	END;