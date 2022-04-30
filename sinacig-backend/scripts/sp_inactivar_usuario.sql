CREATE PROCEDURE [dbo].[sp_inactivar_usuario]
	@id_usuario INT
AS 
	BEGIN
		BEGIN TRANSACTION;
		BEGIN TRY
			UPDATE tc_usuario
			SET
				estado_registro = 0
			WHERE id_usuario = @id_usuario;
					
			SELECT 'Usuario inactivado correctamente.' AS msg, 'ok' AS result;
            COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH

			ROLLBACK TRANSACTION;
			SELECT 'error' AS result ,ERROR_MESSAGE() AS msg;
			RETURN
		END CATCH;

	END;