import Footer from "@/components/footer";
import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        {/* Blue glow */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#0066FF]/20 blur-[150px]" />
        <div className="pointer-events-none absolute top-20 right-[-250px] w-[500px] h-[500px] rounded-full bg-[#0066FF]/10 blur-[150px]" />

        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-[5px] rounded-full bg-[#0066FF]" />
            <span className="text-[#0066FF] font-bold text-[11px] md:text-[13px] tracking-[2px] uppercase">
              Rechtliche Informationen
            </span>
          </div>

          <h1 className="font-bold text-[42px] sm:text-[52px] md:text-[64px] xl:text-[76px] leading-[0.95] uppercase max-w-[1000px]">
            Datenschutzerklärung
          </h1>

          <p className="mt-8 max-w-[760px] text-white/65 text-[16px] md:text-[18px] leading-[1.7]">
            Die folgenden Informationen geben Ihnen einen Überblick darüber,
            was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
            Website besuchen.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative pb-24 2xl:pb-0">
        <div className="max-w-[1150px] mx-auto px-5 sm:px-8 lg:px-10 space-y-6">

          {/* 01 */}
          <PrivacySection number="01" title="Datenschutz auf einen Blick">
            <h3>Allgemeine Hinweise</h3>

            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können. Ausführliche
              Informationen zum Thema Datenschutz entnehmen Sie unserer unter
              diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>

            <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>

            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
              „Hinweis zur verantwortlichen Stelle“ in dieser
              Datenschutzerklärung entnehmen.
            </p>

            <h4>Wie erfassen wir Ihre Daten?</h4>

            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie
              in ein Kontaktformular eingeben.
            </p>

            <p>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
              Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
              allem technische Daten (z. B. Internetbrowser, Betriebssystem
              oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten
              erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            <h4>Wofür nutzen wir Ihre Daten?</h4>

            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
              der Website zu gewährleisten. Andere Daten können zur Analyse
              Ihres Nutzerverhaltens verwendet werden. Sofern über die Website
              Verträge geschlossen oder angebahnt werden können, werden die
              übermittelten Daten auch für Vertragsangebote, Bestellungen oder
              sonstige Auftragsanfragen verarbeitet.
            </p>

            <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>

            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht
              auf die Berichtigung oder Löschung dieser Daten. Wenn Sie eine
              Einwilligung zur Datenverarbeitung erteilt haben, können Sie
              diese Einwilligung jederzeit für die Zukunft widerrufen.
              Außerdem haben Sie das Recht, unter bestimmten Umständen die
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
              verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der
              zuständigen Aufsichtsbehörde zu.
            </p>

            <p>
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
              sich jederzeit an uns wenden.
            </p>
          </PrivacySection>

          {/* 02 */}
          <PrivacySection number="02" title="Hosting">
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>

            <h3>IONOS</h3>

            <p>
              Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur
              (nachfolgend IONOS). Wenn Sie unsere Website besuchen, erfasst
              IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen. Details
              entnehmen Sie der Datenschutzerklärung von IONOS:
            </p>

            <p>
              <a
                href="https://www.ionos.de/terms-gtc/terms-privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066FF] hover:text-white transition-colors break-all"
              >
                https://www.ionos.de/terms-gtc/terms-privacy
              </a>
            </p>

            <p>
              Die Verwendung von IONOS erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
              möglichst zuverlässigen Darstellung unserer Website. Sofern eine
              entsprechende Einwilligung abgefragt wurde, erfolgt die
              Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit.
              a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die
              Speicherung von Cookies oder den Zugriff auf Informationen im
              Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des
              TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>

            <h4>Auftragsverarbeitung</h4>

            <p>
              Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur
              Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt
              es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag,
              der gewährleistet, dass dieser die personenbezogenen Daten
              unserer Websitebesucher nur nach unseren Weisungen und unter
              Einhaltung der DSGVO verarbeitet.
            </p>
          </PrivacySection>

          {/* 03 */}
          <PrivacySection
            number="03"
            title="Allgemeine Hinweise und Pflichtinformationen"
          >
            <h3>Datenschutz</h3>

            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <p>
              Wenn Sie diese Website benutzen, werden verschiedene
              personenbezogene Daten erhoben. Personenbezogene Daten sind
              Daten, mit denen Sie persönlich identifiziert werden können. Die
              vorliegende Datenschutzerklärung erläutert, welche Daten wir
              erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu
              welchem Zweck das geschieht.
            </p>

            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.
              B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
              kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
              Dritte ist nicht möglich.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>

            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>

            {/* Company information */}
            <div className="my-8 rounded-2xl border border-white/10 bg-[#03060F] p-6 md:p-8">
              <p className="!mb-2 !text-white !font-semibold">
                NexForce-IT UG (haftungsbeschränkt)
              </p>

              <p className="!mb-0">
                vertreten durch den Geschäftsführer
                <br />
                Nomer Ahmed Malik
                <br />
                Eduard-Mörike-Str. 10
                <br />
                63477 Maintal, Deutschland
                <br />
                <br />
                Telefon: +49 6109 09664037
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:info@nexforce-it.com"
                  className="text-[#0066FF] hover:text-white transition-colors"
                >
                  info@nexforce-it.com
                </a>
              </p>
            </div>

            <p>
              Verantwortliche Stelle ist die natürliche oder juristische
              Person, die allein oder gemeinsam mit anderen über die Zwecke
              und Mittel der Verarbeitung von personenbezogenen Daten (z. B.
              Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3>Speicherdauer</h3>

            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere
              Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
              Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
              Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
              gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe
              für die Speicherung Ihrer personenbezogenen Daten haben (z. B.
              steuer- oder handelsrechtliche Aufbewahrungsfristen); im
              letztgenannten Fall erfolgt die Löschung nach Fortfall dieser
              Gründe.
            </p>

            <h3>
              Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung
              auf dieser Website
            </h3>

            <p>
              Sofern Sie in die Datenverarbeitung eingewilligt haben,
              verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von
              Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO,
              sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO
              verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung
              in die Übertragung personenbezogener Daten in Drittstaaten
              erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49
              Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies
              oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via
              Device-Fingerprinting) eingewilligt haben, erfolgt die
              Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG.
              Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
              Vertragserfüllung oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage
              des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre
              Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung
              erforderlich sind, auf Grundlage des Art. 6 Abs. 1 lit. c DSGVO.
              Die Datenverarbeitung kann ferner auf Grundlage unseres
              berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
              Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen
              wird in den folgenden Absätzen dieser Datenschutzerklärung
              informiert.
            </p>

            <h3>Empfänger von personenbezogenen Daten</h3>

            <p>
              Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit
              verschiedenen externen Stellen zusammen. Dabei ist teilweise auch
              eine Übermittlung von personenbezogenen Daten an diese externen
              Stellen erforderlich. Wir geben personenbezogene Daten nur dann
              an externe Stellen weiter, wenn dies im Rahmen einer
              Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu
              verpflichtet sind (z. B. Weitergabe von Daten an
              Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6
              Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine
              sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz
              von Auftragsverarbeitern geben wir personenbezogene Daten unserer
              Kunden nur auf Grundlage eines gültigen Vertrags über
              Auftragsverarbeitung weiter. Im Falle einer gemeinsamen
              Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung
              geschlossen.
            </p>

            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>

            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte
              Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
              unberührt.
            </p>

            <h3>
              Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen
              sowie gegen Direktwerbung (Art. 21 DSGVO)
            </h3>

            <p className="uppercase">
              WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E
              ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN,
              DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE
              VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH
              EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN
              GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN
              EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER
              DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR
              IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN,
              ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE
              VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
              FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER
              GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN
              (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>

            <p className="uppercase">
              WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG
              ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN
              DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM
              ZWECKE DERARTIGEN WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS
              PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG
              STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN
              DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG
              VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
            </p>

            <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>

            <p>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
              Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem
              Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
              oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht
              besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
              gerichtlicher Rechtsbehelfe.
            </p>

            <h3>Recht auf Datenübertragbarkeit</h3>

            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
              Einwilligung oder in Erfüllung eines Vertrags automatisiert
              verarbeiten, an sich oder an einen Dritten in einem gängigen,
              maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
              direkte Übertragung der Daten an einen anderen Verantwortlichen
              verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3>Auskunft, Berichtigung und Löschung</h3>

            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
              jederzeit das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht
              auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu
              weiteren Fragen zum Thema personenbezogene Daten können Sie sich
              jederzeit an uns wenden.
            </p>

            <h3>Recht auf Einschränkung der Verarbeitung</h3>

            <p>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen. Hierzu können Sie sich
              jederzeit an uns wenden. Das Recht auf Einschränkung der
              Verarbeitung besteht in folgenden Fällen:
            </p>

            <ul>
              <li>
                Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
                personenbezogenen Daten bestreiten, benötigen wir in der Regel
                Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben
                Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen.
              </li>

              <li>
                Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
                geschah/geschieht, können Sie statt der Löschung die
                Einschränkung der Datenverarbeitung verlangen.
              </li>

              <li>
                Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie
                sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von
                Rechtsansprüchen benötigen, haben Sie das Recht, statt der
                Löschung die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen.
              </li>

              <li>
                Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt
                haben, muss eine Abwägung zwischen Ihren und unseren Interessen
                vorgenommen werden. Solange noch nicht feststeht, wessen
                Interessen überwiegen, haben Sie das Recht, die Einschränkung
                der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
            </ul>

            <p>
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
              eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung
              abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung,
              Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz
              der Rechte einer anderen natürlichen oder juristischen Person oder
              aus Gründen eines wichtigen öffentlichen Interesses der
              Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
            </p>
          </PrivacySection>

          {/* 04 */}
          <PrivacySection
            number="04"
            title="Datenerfassung auf dieser Website"
          >
            <h3>Server-Log-Dateien</h3>

            <p>
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
            </p>

            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>

            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen.
            </p>

            <p>
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs.
              1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes
              Interesse an der technisch fehlerfreien Darstellung und der
              Optimierung seiner Website – hierzu müssen die Server-Log-Files
              erfasst werden.
            </p>

            <h3>Kontaktformular</h3>

            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
              sofern diese abgefragt wurde; die Einwilligung ist jederzeit
              widerrufbar.
            </p>

            <p>
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben
              bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung
              zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
              entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage).
              Zwingende gesetzliche Bestimmungen – insbesondere
              Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>

            <p>
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird
              Ihre Anfrage inklusive aller daraus hervorgehenden
              personenbezogenen Daten (Name, Anfrage) zum Zwecke der
              Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
              sofern diese abgefragt wurde; die Einwilligung ist jederzeit
              widerrufbar.
            </p>

            <p>
              Die von Ihnen an uns per Kontaktanfragen übersandten Daten
              verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre
              Einwilligung zur Speicherung widerrufen oder der Zweck für die
              Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
              Ihres Anliegens). Zwingende gesetzliche Bestimmungen –
              insbesondere gesetzliche Aufbewahrungsfristen – bleiben
              unberührt.
            </p>
          </PrivacySection>

          {/* 05 */}
          <PrivacySection number="05" title="IONOS WebAnalytics">
            <p>
              Diese Website nutzt IONOS WebAnalytics zur statistischen
              Auswertung und technischen Optimierung unseres Internetauftritts.
            </p>

            <p>
              Nach Angaben von IONOS werden die Daten über einen Pixel oder über
              Log-Dateien ermittelt. WebAnalytics verwendet keine Cookies. Die
              IP-Adresse wird beim Seitenabruf übertragen und anschließend
              unmittelbar anonymisiert, sodass die Auswertung ohne
              Personenbezug erfolgt.
            </p>

            <p>
              Erfasst werden können insbesondere Referrer, angeforderte Seite
              oder Datei, Browsertyp und Browserversion, Betriebssystem,
              Gerätetyp, Zeitpunkt des Zugriffs sowie die IP-Adresse in
              anonymisierter Form. IONOS gibt die für WebAnalytics erhobenen
              Daten nach eigenen Angaben nicht an Dritte weiter.
            </p>

            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
              DSGVO. Unser berechtigtes Interesse liegt in der statistischen
              Auswertung und technischen Optimierung unserer Website.
            </p>
          </PrivacySection>

          {/* 06 */}
          <PrivacySection number="06" title="Soziale Medien">
            <h3>Externe Links zu Instagram und LinkedIn</h3>

            <p>
              Auf dieser Website befinden sich ausschließlich externe Links zu
              unseren Profilen bei Instagram und LinkedIn. Beim bloßen Besuch
              unserer Website wird über diese Links keine Verbindung zu den
              Servern der jeweiligen Anbieter hergestellt.
            </p>

            <p>
              Erst wenn Sie einen solchen Link anklicken, verlassen Sie unsere
              Website und rufen die jeweilige Plattform auf. Ab diesem
              Zeitpunkt erfolgt die Datenverarbeitung nach den
              Datenschutzbestimmungen des jeweiligen Plattformbetreibers. Auf
              diese Verarbeitung haben wir keinen Einfluss.
            </p>
          </PrivacySection>

        </div>
      </section>
    </main>
  );
}


/* ================= REUSABLE SECTION ================= */

function PrivacySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#03060F] p-6 sm:p-8 md:p-10 lg:p-12">

      {/* Blue glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-[#0066FF]/10 blur-[130px]" />

      <div className="relative z-10">

        {/* Section number */}
        <div className="flex items-center gap-4 mb-7">
          <span className="text-[#0066FF] text-[13px] md:text-[14px] font-bold tracking-[1px]">
            {number}
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        <h2 className="text-[25px] sm:text-[30px] md:text-[36px] font-bold leading-tight uppercase mb-8">
          {title}
        </h2>

        <div className="privacy-content">
          {children}
        </div>
      </div>
      
    </section>
    

  );
}