USE [control_sinacig]
GO
  /****** Object:  StoredProcedure [dbo].[sp_get_control_interno]    Script Date: 30/06/2022 10:36:17 ******/
SET
  ANSI_NULLS ON
GO
SET
  QUOTED_IDENTIFIER ON
GO
  ALTER procedure [dbo].[sp_get_control_interno] @Id_riesgo_plan_trabajo int as Begin
select
  ttr.id_riesgo_plan_trabajo as 'id_riesgo_plan_trabajo',
  ttr.id_riesgo_control_interno as 'id_control_interno',
  ttr.descripcion as 'descripcion'
from
  tt_riesgo_control_interno ttr
where
  ttr.estado_registro = 1
  and ttr.id_riesgo_plan_trabajo = @Id_riesgo_plan_trabajo
END