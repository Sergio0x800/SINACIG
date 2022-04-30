CREATE PROCEDURE [dbo].[sp_autenticar_usuario]
    @usuario VARCHAR(20),
	@password VARCHAR(32)
AS
	BEGIN
		DECLARE @password_almacenada VARCHAR(32);


		SELECT @password_almacenada = password FROM tc_usuario WHERE usuario = @usuario AND estado_registro = 1;
	
		IF @password_almacenada IS NOT NULL
			BEGIN
				BEGIN TRY

					--COMPARAMOS QUE LA CLAVE SEA CORRECTA
					IF @password_almacenada = @password 
						BEGIN
							SELECT 'Bienvenido al sistema!' AS msg, 
									'ok' AS 'result',
									u.id_usuario AS id_usuario,
									u.cui AS cui, 
									u.usuario AS usuario,
									u.nombres AS nombres, 
									u.apellidos AS apellidos,
									u.id_rol AS id_rol 
							FROM tc_usuario u
							WHERE u.usuario = @usuario
							AND u.estado_registro = 1;

							RETURN
						END;
					ELSE
						BEGIN
							SELECT 'Contraseña Incorrecta!.' AS msg, 'error' AS 'result';
							RETURN
						END;
				END TRY
				BEGIN CATCH
					SELECT 'Error al inciar sesión. Intente más tarde.' AS msg, 'error' AS 'result';
					RETURN
				END CATCH;
			END
		ELSE
			BEGIN
				SELECT 'Usuario no existe!.' AS msg, 'error' AS 'result';
			END;
	END;