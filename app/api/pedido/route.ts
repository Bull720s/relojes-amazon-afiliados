import { NextResponse } from "next/server";

type PedidoItem = {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
};

type PedidoBody = {
  items: PedidoItem[];
  nombre: string;
  telefono: string;
  notas?: string;
  total: number;
};

export async function POST(req: Request) {
  const body = (await req.json()) as PedidoBody;

  if (!body?.items?.length || !body.nombre?.trim() || !body.telefono?.trim()) {
    return NextResponse.json({ error: "Faltan datos del pedido" }, { status: 400 });
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  const productosResumen = body.items
    .map((i) => `${i.nombre} x${i.cantidad} — $${i.precio * i.cantidad} MXN`)
    .join("\n");

  if (!token || !databaseId) {
    // Configuración de Notion pendiente: se deja constancia en los logs del servidor
    // para no perder el pedido mientras se termina de conectar la base de datos.
    console.error("NOTION_TOKEN / NOTION_DATABASE_ID no configurados. Pedido recibido:", {
      ...body,
      productosResumen,
    });
    return NextResponse.json(
      { error: "El envío de pedidos todavía no está conectado a Notion." },
      { status: 500 }
    );
  }

  const notionRes = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Nombre: { title: [{ text: { content: body.nombre } }] },
        Teléfono: { rich_text: [{ text: { content: body.telefono } }] },
        Productos: { rich_text: [{ text: { content: productosResumen } }] },
        Notas: { rich_text: [{ text: { content: body.notas || "" } }] },
        Total: { number: body.total },
        Estado: { select: { name: "Nuevo" } },
      },
    }),
  });

  if (!notionRes.ok) {
    const detail = await notionRes.text();
    console.error("Error al escribir el pedido en Notion:", detail);
    return NextResponse.json({ error: "No se pudo guardar el pedido en Notion." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
