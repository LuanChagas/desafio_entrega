--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: entregas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entregas (
    id integer NOT NULL,
    data_entrega date NOT NULL,
    criado_em timestamp without time zone NOT NULL,
    nome_cliente character varying NOT NULL,
    ponto_partida character varying NOT NULL,
    ponto_destino character varying NOT NULL,
    ponto_partida_dados json,
    ponto_destino_dados json
);


ALTER TABLE public.entregas OWNER TO postgres;

--
-- Name: entregas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.entregas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.entregas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: entregas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entregas (id, data_entrega, criado_em, nome_cliente, ponto_partida, ponto_destino, ponto_partida_dados, ponto_destino_dados) FROM stdin;
40	2024-09-21	2024-09-22 15:47:15	teste	12345	54321	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}
83	2024-09-21	2024-09-22 16:50:02	teste	12345	54321	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}
84	2024-09-21	2024-09-22 16:50:03	teste	12345	54321	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}
85	2024-09-21	2024-09-22 16:50:04	teste	12345	54321	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}	{"logradouro":"string","bairro":"string","localidade":"string","estado":"string"}
88	2026-08-15	2024-09-22 18:05:45	Luan chagas	28070-272	28090-610	{"cep":"28070-272","logradouro":"Avenida Carlos Alberto Chebabe","complemento":"de 479 a 715 - lado ímpar","unidade":"","bairro":"Parque Guarus","localidade":"Campos dos Goytacazes","uf":"RJ","estado":"Rio de Janeiro","regiao":"Sudeste","ibge":"3301009","gia":"","ddd":"22","siafi":"5819"}	{"cep":"28090-610","logradouro":"Rua J","complemento":"","unidade":"","bairro":"Codim","localidade":"Campos dos Goytacazes","uf":"RJ","estado":"Rio de Janeiro","regiao":"Sudeste","ibge":"3301009","gia":"","ddd":"22","siafi":"5819"}
89	2026-08-15	2024-09-22 18:07:25	Luan chagas	28070-272	28090-610	{"cep":"28070-272","logradouro":"Avenida Carlos Alberto Chebabe","complemento":"de 479 a 715 - lado ímpar","unidade":"","bairro":"Parque Guarus","localidade":"Campos dos Goytacazes","uf":"RJ","estado":"Rio de Janeiro","regiao":"Sudeste","ibge":"3301009","gia":"","ddd":"22","siafi":"5819"}	{"cep":"28090-610","logradouro":"Rua J","complemento":"","unidade":"","bairro":"Codim","localidade":"Campos dos Goytacazes","uf":"RJ","estado":"Rio de Janeiro","regiao":"Sudeste","ibge":"3301009","gia":"","ddd":"22","siafi":"5819"}
\.


--
-- Name: entregas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entregas_id_seq', 89, true);


--
-- Name: entregas entregas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entregas
    ADD CONSTRAINT entregas_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

