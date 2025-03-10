USE [control_sinacig]
GO
  /****** Object:  StoredProcedure [UsrSICODA].[sp_get_unidad_ejecutora_by_id]    Script Date: 30/06/2022 10:56:57 ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  ALTER procedure [UsrSICODA].[sp_get_unidad_ejecutora_by_id] @id_unidad_ejecutora int as Begin
SELECT
  ue.codigo_unidad as codigo,
  ue.nombre_unidad as nombre
from
  tc_unidad_ejecutora ue
where
  ue.id_unidad_ejecutora = @id_unidad_ejecutora
  AND estado_registro = 1
END