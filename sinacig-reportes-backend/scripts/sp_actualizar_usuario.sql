alter PROCEDURE [dbo].[sp_actualizar_usuario]
	@id_usuario INT,
	@id_rol INT,
	@cui NUMERIC,
	@nombres VARCHAR(50),
	@apellidos VARCHAR(50),
	@password VARCHAR(255),
	@id_usuario_ingreso INT
AS 
	BEGIN
        DECLARE @@new_password VARCHAR(255)

        IF @password = 'NULL'
            BEGIN
                SELECT 
                    @@new_password = password
                FROM 
                    tc_usuario
                WHERE 
                    id_usuario = @id_usuario
                ;
            END
        ELSE
            BEGIN
                SET @@new_password = @password;
            END

		BEGIN TRANSACTION;
		BEGIN TRY
			UPDATE tc_usuario
			SET
				id_rol = @id_rol,
				cui = @cui, 
				nombres = @nombres,
				apellidos = @apellidos,
				password = @@new_password
			WHERE 
				id_usuario = @id_usuario
			;
					
			SELECT 'Usuario actualizado correctamente.' AS msg, 'ok' AS result;
            COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH

			ROLLBACK TRANSACTION;
			SELECT 'error' AS result ,ERROR_MESSAGE() AS msg;
			RETURN
		END CATCH;

	END;