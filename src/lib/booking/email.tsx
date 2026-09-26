import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Письмо менеджеру. Оно всегда на русском — рабочем языке агентства,
// а язык сайта указан отдельно, чтобы менеджер ответил туристу на его языке.
// React сам экранирует введённый текст, поэтому HTML из формы не выполнится

export type BookingEmailProps = {
  subject: string;
  rows: { label: string; value: string; href?: string }[];
  comment?: string;
};

export function BookingEmail({ subject, rows, comment }: BookingEmailProps) {
  return (
    <Html lang="ru">
      <Head />
      <Preview>{subject}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>Joldosh · заявка с сайта</Text>
          <Heading as="h1" style={styles.heading}>
            {subject}
          </Heading>
          <Section>
            {rows.map((row) => (
              <Text key={row.label} style={styles.row}>
                <span style={styles.label}>{row.label}</span>
                <br />
                {row.href ? (
                  <Link href={row.href} style={styles.link}>
                    {row.value}
                  </Link>
                ) : (
                  row.value
                )}
              </Text>
            ))}
          </Section>
          {comment && (
            <>
              <Hr style={styles.hr} />
              <Text style={styles.label}>Комментарий</Text>
              <Text style={styles.comment}>{comment}</Text>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f8f4ef",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "24px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    maxWidth: "560px",
    padding: "32px",
  },
  brand: { color: "#d24011", fontSize: "13px", fontWeight: 700, margin: 0 },
  heading: {
    color: "#1c1410",
    fontSize: "22px",
    lineHeight: "1.3",
    margin: "8px 0 24px",
  },
  row: {
    color: "#1c1410",
    fontSize: "16px",
    lineHeight: "1.4",
    margin: "0 0 16px",
  },
  label: { color: "#6c6158", fontSize: "13px" },
  link: { color: "#d24011" },
  hr: { borderColor: "#ede7df", margin: "8px 0 16px" },
  comment: {
    color: "#1c1410",
    fontSize: "16px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap" as const,
  },
};
