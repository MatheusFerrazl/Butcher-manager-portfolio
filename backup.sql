--
-- PostgreSQL database dump
--

\restrict lh29B8calvXcKO1NMJU4kammXgHfawLUSebOec38o89qdQWVceBJb14raGMP5pJ

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-28 16:13:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 16389)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    username text CONSTRAINT clients_name_not_null NOT NULL,
    balance numeric(10,2) DEFAULT 0
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16397)
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_id_seq OWNER TO postgres;

--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 220
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- TOC entry 226 (class 1259 OID 24717)
-- Name: cows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cows (
    id integer NOT NULL,
    number_tag character varying(50) CONSTRAINT cows_number_not_null NOT NULL,
    description text,
    supplier character varying(255),
    weight numeric(10,2) NOT NULL,
    date date DEFAULT CURRENT_DATE,
    is_alive boolean DEFAULT true
);


ALTER TABLE public.cows OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24716)
-- Name: cows_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cows_id_seq OWNER TO postgres;

--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 225
-- Name: cows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cows_id_seq OWNED BY public.cows.id;


--
-- TOC entry 234 (class 1259 OID 24838)
-- Name: losses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.losses (
    id integer NOT NULL,
    description text,
    value numeric(10,2) CONSTRAINT losses_amount_not_null NOT NULL,
    loss_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reason text
);


ALTER TABLE public.losses OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24837)
-- Name: losses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.losses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.losses_id_seq OWNER TO postgres;

--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 233
-- Name: losses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.losses_id_seq OWNED BY public.losses.id;


--
-- TOC entry 221 (class 1259 OID 16398)
-- Name: meats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meats (
    id integer NOT NULL,
    name text NOT NULL,
    price numeric(10,2) CONSTRAINT meats_price_per_kg_not_null NOT NULL
);


ALTER TABLE public.meats OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16406)
-- Name: meats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.meats_id_seq OWNER TO postgres;

--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 222
-- Name: meats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meats_id_seq OWNED BY public.meats.id;


--
-- TOC entry 230 (class 1259 OID 24799)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    type text DEFAULT 'dinheiro'::text
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24798)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 229
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 232 (class 1259 OID 24816)
-- Name: sale_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sale_items (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    meat_id integer NOT NULL,
    weight numeric(10,3) NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.sale_items OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24815)
-- Name: sale_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sale_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sale_items_id_seq OWNER TO postgres;

--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 231
-- Name: sale_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sale_items_id_seq OWNED BY public.sale_items.id;


--
-- TOC entry 228 (class 1259 OID 24784)
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    client_id integer,
    total numeric(10,2) NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24783)
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_seq OWNER TO postgres;

--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 227
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- TOC entry 223 (class 1259 OID 16420)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text CONSTRAINT users_password_hash_not_null NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16428)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4790 (class 2604 OID 16429)
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 24720)
-- Name: cows id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cows ALTER COLUMN id SET DEFAULT nextval('public.cows_id_seq'::regclass);


--
-- TOC entry 4803 (class 2604 OID 24841)
-- Name: losses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.losses ALTER COLUMN id SET DEFAULT nextval('public.losses_id_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 16430)
-- Name: meats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meats ALTER COLUMN id SET DEFAULT nextval('public.meats_id_seq'::regclass);


--
-- TOC entry 4799 (class 2604 OID 24802)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4802 (class 2604 OID 24819)
-- Name: sale_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items ALTER COLUMN id SET DEFAULT nextval('public.sale_items_id_seq'::regclass);


--
-- TOC entry 4797 (class 2604 OID 24787)
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 16433)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4974 (class 0 OID 16389)
-- Dependencies: 219
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, username, balance) FROM stdin;
2	fulano	\N
3	ciclano	\N
\.


--
-- TOC entry 4981 (class 0 OID 24717)
-- Dependencies: 226
-- Data for Name: cows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cows (id, number_tag, description, supplier, weight, date, is_alive) FROM stdin;
6	3	uma vaca muito braba!	Jairo	240.00	2026-04-13	t
10	6	uma vaca muito braba!	Jairo	240.00	2026-04-13	t
11	7	uma bela vaca	fabio	300.00	2026-04-13	t
12	8	uma ótima vaca	lourival	350.00	2026-04-13	t
4	4	uma vaca muito braba!	Jairo	240.00	2026-04-12	t
15	10	uma vaca aventureira	seila	230.00	2026-04-13	f
13	101	uma vaca preta	isaac	800.00	2026-04-13	t
\.


--
-- TOC entry 4989 (class 0 OID 24838)
-- Dependencies: 234
-- Data for Name: losses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.losses (id, description, value, loss_date, reason) FROM stdin;
1	faca	10.00	2026-04-27 00:00:00	compramos uma nova faca
\.


--
-- TOC entry 4976 (class 0 OID 16398)
-- Dependencies: 221
-- Data for Name: meats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meats (id, name, price) FROM stdin;
1	Mignon	80.00
2	Contra-Filé	46.90
5	Alcatra	46.90
6	chã de dentro	42.90
7	patinho	42.90
8	chã de fora	36.00
9	lagarto	36.00
10	fraldinha	35.00
11	paleta	35.00
12	carne de 2°	34.00
13	maça de peito	34.00
14	carne moida	34.00
15	costela	20.00
16	rabada	24.00
17	figado	24.00
18	lingua	15.00
19	bucho sujo un.	40.00
20	bucho limpo	16.50
21	carne seca 1°	55.00
22	carne seca 2°	45.00
23	ponta carne seca	38.00
27	mocoto	10.00
100	picanha	70.00
\.


--
-- TOC entry 4985 (class 0 OID 24799)
-- Dependencies: 230
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, sale_id, amount, created_at, type) FROM stdin;
1	2	5.00	2026-04-27 00:00:00	dinheiro
2	2	80.00	2026-04-27 00:00:00	dinheiro
3	2	0.80	2026-04-27 00:00:00	dinheiro
4	3	36.00	2026-04-27 00:00:00	pix
5	1	77.00	2026-04-27 00:00:00	dinheiro
\.


--
-- TOC entry 4987 (class 0 OID 24816)
-- Dependencies: 232
-- Data for Name: sale_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sale_items (id, sale_id, meat_id, weight, price) FROM stdin;
1	1	27	0.500	5.00
2	1	9	2.000	72.00
3	2	7	2.000	85.80
4	3	9	1.000	36.00
\.


--
-- TOC entry 4983 (class 0 OID 24784)
-- Dependencies: 228
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id, client_id, total, date) FROM stdin;
1	3	77.00	2026-04-27 00:00:00
2	2	85.80	2026-04-27 00:00:00
3	2	36.00	2026-04-27 00:00:00
\.


--
-- TOC entry 4978 (class 0 OID 16420)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
1	admin	$2b$10$b5knbl9cBG4PWtr0Gm1BLe3LabEo1vOmsDs9.067OVESp.MNiPA8K
\.


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 220
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 3, true);


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 225
-- Name: cows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cows_id_seq', 15, true);


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 233
-- Name: losses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.losses_id_seq', 1, true);


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 222
-- Name: meats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meats_id_seq', 100, true);


--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 229
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 5, true);


--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 231
-- Name: sale_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sale_items_id_seq', 4, true);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 227
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_seq', 3, true);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 4806 (class 2606 OID 16435)
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- TOC entry 4814 (class 2606 OID 24728)
-- Name: cows cows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cows
    ADD CONSTRAINT cows_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 24848)
-- Name: losses losses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.losses
    ADD CONSTRAINT losses_pkey PRIMARY KEY (id);


--
-- TOC entry 4808 (class 2606 OID 16437)
-- Name: meats meats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meats
    ADD CONSTRAINT meats_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 24808)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4820 (class 2606 OID 24826)
-- Name: sale_items sale_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 24792)
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- TOC entry 4810 (class 2606 OID 16443)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4812 (class 2606 OID 16445)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4824 (class 2606 OID 24809)
-- Name: payments payments_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(id) ON DELETE CASCADE;


--
-- TOC entry 4825 (class 2606 OID 24832)
-- Name: sale_items sale_items_meat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_meat_id_fkey FOREIGN KEY (meat_id) REFERENCES public.meats(id);


--
-- TOC entry 4826 (class 2606 OID 24827)
-- Name: sale_items sale_items_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(id) ON DELETE CASCADE;


--
-- TOC entry 4823 (class 2606 OID 24793)
-- Name: sales sales_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);


-- Completed on 2026-04-28 16:13:18

--
-- PostgreSQL database dump complete
--

\unrestrict lh29B8calvXcKO1NMJU4kammXgHfawLUSebOec38o89qdQWVceBJb14raGMP5pJ

