import { useEffect, useRef, useState } from "react";
import "./Craft.css";
import type { Route } from "../+types/root";

import futurehomeResearch from "../assets/craft/futurehome/futurehome1.png";
import futurehomeHierarchy from "../assets/craft/futurehome/futurehome2.png";
import futurehomePrototype from "../assets/craft/futurehome/futurehome3.png";
import ImageCarousel from "../components/ImageCarousel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dora Makszy portfolio" },
    { name: "description", content: "Dora Makszy portfolio" },
  ];
}

// Dynamically pick up whatever crmN.png files exist in
// app/assets/craft/vcclive/ — crm4 is the "how I worked through the
// data" image, crm5-13 are the high-fidelity screens for the carousel.
// Using a glob here means the page doesn't break the build if some
// files aren't there yet, and new ones get picked up automatically
// once added.
const vcclivePhotos = import.meta.glob("../assets/craft/vcclive/crm*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function getVccliveImages(min: number, max: number) {
  return Object.entries(vcclivePhotos)
    .map(([path, src]) => {
      const match = path.match(/crm(\d+)\.png$/);
      return { index: match ? parseInt(match[1], 10) : 0, src };
    })
    .filter((img) => img.index >= min && img.index <= max)
    .sort((a, b) => a.index - b.index)
    .map((img) => img.src);
}

const vccliveDataImage = getVccliveImages(4, 4);
const vccliveScreens = getVccliveImages(5, 13);

// Separate, single "user problems" board — not part of the crmN
// sequence, so it's its own glob and doesn't shift if crm files change.
const vccliveUserProblemsPhoto = import.meta.glob(
  "../assets/craft/vcclive/user-problems.png",
  { eager: true, import: "default" }
) as Record<string, string>;
const vccliveUserProblemsImage = Object.values(vccliveUserProblemsPhoto)[0];

// Airthings visuals: named files picked up individually so the build
// doesn't break while some (or all) of them are still missing — drop
// personas.png, process.png, onboarding.png, everyday.png and
// sketches.png into app/assets/craft/airthings/ and each one is wired
// in automatically.
const airthingsPhotos = import.meta.glob("../assets/craft/airthings/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function getAirthingsImage(name: string) {
  const match = Object.entries(airthingsPhotos).find(([path]) =>
    path.endsWith(`/${name}.png`)
  );
  return match?.[1];
}

const airthingsPersonas = getAirthingsImage("personas");
const airthingsProcess = getAirthingsImage("process");
const airthingsOnboarding = getAirthingsImage("onboarding");
const airthingsEveryday = getAirthingsImage("everyday");
const airthingsSketches = getAirthingsImage("sketches");

type SectionId = "designsystems" | "vcclive" | "futurehome" | "airthings";

function Craft() {
  const [openMap, setOpenMap] = useState<Record<SectionId, boolean>>({
    designsystems: true,
    vcclive: false,
    futurehome: false,
    airthings: false,
  });

  // Accordion group: opening one case study closes the others.
  const toggle = (id: SectionId, open: boolean) => {
    setOpenMap(
      open
        ? {
            designsystems: id === "designsystems",
            vcclive: id === "vcclive",
            futurehome: id === "futurehome",
            airthings: id === "airthings",
          }
        : (m) => ({ ...m, [id]: false })
    );
  };

  // Scrolls the newly opened case study's title to the top of the
  // viewport — like turning a page, always landing on the top of the
  // new content instead of wherever it happened to sit on the page.
  //
  // This runs in an effect keyed on openMap rather than from the click
  // itself, which is what made it unreliable before: opening a new
  // section and closing the previous one both happen through the same
  // state update, but the previous section's collapse is only reliably
  // reflected in the DOM once React has committed that update. Scrolling
  // from the click handler could fire before that commit landed, so the
  // scroll target's position was sometimes calculated from a page that
  // hadn't finished collapsing the old section yet.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the very first run — Design Systems starts open by
      // default, and this shouldn't cause a scroll on page load.
      isFirstRender.current = false;
      return;
    }
    const openId = (Object.keys(openMap) as SectionId[]).find(
      (id) => openMap[id]
    );
    if (!openId) return;
    requestAnimationFrame(() => {
      document
        .getElementById(openId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [openMap]);

  return (
    <main className="content craft-page">
      <section className="card">
        <h1>Case studies</h1>

        {/* ================= DESIGN SYSTEMS (ELEMENT LOGIC) ================= */}
        <details
          id="designsystems"
          className="craft-case accordion-section"
          open={openMap.designsystems}
          onToggle={(e) => toggle("designsystems", e.currentTarget.open)}
        >
          <summary className="craft-case-summary">
            <span className="craft-case-title">
              Design Systems — from component libraries to agentic workflows
            </span>
            <span className="craft-case-meta">
              <span className="craft-role">
                Head of Design, Element Logic · 2024–present
              </span>
              <span className="craft-focus">
                Design systems strategy, component architecture, AI-assisted
                tooling, cross-functional engineering collaboration
              </span>
            </span>
          </summary>

          <div className="accordion-content">
            <div className="craft-results">
              <span className="craft-results-label">Results</span>
              <p>
                Unified two divergent component libraries into one shared
                standard, cut new-component build time significantly, and
                freed up design time previously spent maintaining the
                system for research.
              </p>
            </div>

            <p className="craft-note">
              A note on this case study: company names and visuals are
              withheld due to NDA — happy to speak to specifics in
              conversation.
            </p>

            <h3>The challenge</h3>
            <p>
              This spans design systems work across B2B logistics,
              smarthome/IoT, fintech, and internal admin platforms, in
              teams ranging from 5 people to several hundred — done both
              the traditional way (component libraries, tokens,
              documentation) and the agentic way, where AI agents
              themselves work within the system's rules. The clearest
              example: two product teams had grown their own component
              libraries in parallel — one in MudBlazor, one in React — and
              the gap between them kept widening. Every new feature meant
              engineers rebuilding components that already existed
              elsewhere, just slightly differently. Nothing was technically
              broken, but nothing matched either, and the inconsistency was
              quietly costing everyone time.
            </p>

            <div className="craft-section-divider" />

            <h3>My approach</h3>
            <ol className="craft-approach">
              <li>
                <strong>Audited both libraries side by side.</strong> Found
                where they'd diverged and why — technical constraint,
                design drift, or just nobody noticing.
              </li>
              <li>
                <strong>
                  Set a shared standard both stacks could implement
                  against,
                </strong>{" "}
                rather than forcing one team onto the other's system.
              </li>
              <li>
                <strong>Worked directly with engineering throughout.</strong>{" "}
                Not a handoff, but an ongoing loop of aligning on what was
                buildable and adjusting the design when it wasn't.
              </li>
              <li>
                <strong>
                  Introduced AI into the documentation and
                  component-generation workflow,
                </strong>{" "}
                within clear guardrails, to keep the two libraries in sync
                as they scaled.
              </li>
              <li>
                <strong>Prioritized adoption through conversation over mandate.</strong>{" "}
                Sat with teams to understand what worked before asking them
                to change anything.
              </li>
              <li>
                <strong>Took the same discipline further.</strong>{" "}
                Currently building an agentic design system in Claude for a
                warehouse management context, where AI agents — not just
                designers and engineers — need to work within the system's
                rules. Same principles, applied to a new kind of "user."
              </li>
            </ol>

            <div className="craft-visual-pending">
              Visuals for this case study are pending (NDA-cleared
              screenshots/diagrams to come).
            </div>

            <div className="craft-section-divider" />

            <div className="craft-impact-outcome">
              <div>
                <h3>The impact</h3>
                <div className="craft-stats">
                  <div className="craft-stat">
                    <span className="craft-stat-number">Scratch→Reuse</span>
                    <span className="craft-stat-label">
                      component workflow for engineers
                    </span>
                  </div>
                  <div className="craft-stat">
                    <span className="craft-stat-number">2→1</span>
                    <span className="craft-stat-label">
                      component libraries unified (MudBlazor &amp; React)
                    </span>
                  </div>
                  <div className="craft-stat">
                    <span className="craft-stat-number">Fewer errors</span>
                    <span className="craft-stat-label">
                      in shipped interfaces
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3>The outcome</h3>
                <p>
                  Engineers stopped rebuilding components from scratch and
                  started assembling layouts from a shared system. Two
                  previously divergent libraries became fully consistent,
                  and the time freed up on the design side went straight
                  back into research — understanding the people using the
                  product, not maintaining the system behind it.
                </p>
              </div>
            </div>
          </div>
        </details>

        {/* ================= VCC:LIVE ================= */}
        <details
          id="vcclive"
          className="craft-case accordion-section"
          open={openMap.vcclive}
          onToggle={(e) => toggle("vcclive", e.currentTarget.open)}
        >
          <summary className="craft-case-summary">
            <span className="craft-case-title">
              VCC:Live — redesigning the operator's cockpit
            </span>
            <span className="craft-case-meta">
              <span className="craft-role">
                Design Team Leader · 2020–2022
              </span>
              <span className="craft-focus">
                Interaction design, information architecture, design system
                foundations
              </span>
            </span>
          </summary>

          <div className="accordion-content">
            <div className="craft-results">
              <span className="craft-results-label">Results</span>
              <p>
                ~20% faster average call handling, agent ramp-up cut from 3
                weeks to 2, and the product's first design system — built
                outward from this view.
              </p>
            </div>

            <h3>The challenge</h3>
            <p>
              Call center agents worked from one screen while live on a
              call: the script they had to follow, the customer's history
              and details, and the call controls itself. That screen had
              grown into a patchwork — script, customer data, and controls
              competed for space and attention, forcing agents to hunt
              across tabs mid-call. Under call pressure, that cost time and
              caused mistakes. There was also no shared design system yet,
              so every new feature added its own visual logic.
            </p>

            <div className="craft-section-divider" />

            <h3>My approach</h3>
            <ol className="craft-approach">
              <li>
                <strong>
                  Mapped the whole product before touching one screen.
                </strong>{" "}
                Every feature idea went onto a board with no filter, then
                got grouped into themes, then sorted into what belonged in
                the MVP versus the backlog. The call-handling view — the
                cockpit — earned its place in the MVP on its own merits,
                which is what justified rebuilding it properly instead of
                patching the existing layout.
              </li>
            </ol>

            <div className="craft-figure-block">
              {vccliveUserProblemsImage ? (
                <>
                  <img
                    src={vccliveUserProblemsImage}
                    alt="Affinity map of user problems: pain points from agents, customers, managers, and sales grouped by theme."
                  />
                  <p className="craft-figure-caption">
                    Figure 1. User problems mapped out
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Affinity map of user problems goes here (
                  <code>user-problems.png</code> in{" "}
                  <code>app/assets/craft/vcclive/</code>).
                </div>
              )}
            </div>

            <ol className="craft-approach" start={2}>
              <li>
                <strong>Watched real calls.</strong> I shadowed operators to
                see, in the moment, what information they reached for and
                when — not what the org chart assumed they needed.
              </li>
              <li>
                <strong>Separated always-visible from on-demand.</strong>{" "}
                Mapped which information had to be permanently in view
                during a call and what could be pulled up only when needed.
              </li>
              <li>
                <strong>Mapped assumptions and ideated.</strong> Wrote down
                what we were assuming about agents' needs, then ran fast
                ideation rounds to turn those assumptions into concrete
                directions worth testing.
              </li>
            </ol>

            <div className="craft-figure-block">
              {vccliveDataImage.length > 0 ? (
                <>
                  <img
                    src={vccliveDataImage[0]}
                    alt="Ideation process: raw ideas grouped into themes and scoped into an MVP and backlog."
                  />
                  <p className="craft-figure-caption">
                    Figure 2. How I worked with data
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Raw ideas → themes → MVP/backlog image goes here (crm4 in{" "}
                  <code>app/assets/craft/vcclive/</code>).
                </div>
              )}
            </div>

            <ol className="craft-approach" start={5}>
              <li>
                <strong>Rebuilt the layout into fixed zones.</strong>{" "}
                Script, live customer context, and call controls each got a
                predictable, dedicated zone instead of competing for the
                same space.
              </li>
              <li>
                <strong>Built the design system this view needed.</strong>{" "}
                Established the components and patterns as reusable
                foundations, not one-off fixes — the first real design
                system for the product.
              </li>
              <li>
                <strong>
                  Rolled it out with a design team I was building from
                  scratch,
                </strong>{" "}
                using the new structure as the reference point for every
                feature that followed.
              </li>
            </ol>

            {vccliveScreens.length > 0 ? (
              <ImageCarousel
                images={vccliveScreens}
                altPrefix="VCC:Live high-fidelity screen"
              />
            ) : (
              <div className="craft-visual-pending">
                High-fidelity screens go here (crm5–crm13 in{" "}
                <code>app/assets/craft/vcclive/</code>).
              </div>
            )}

            <div className="craft-section-divider" />

            <div className="craft-impact-outcome">
              <div>
                <h3>The impact</h3>
                <div className="craft-stats">
                  <div className="craft-stat">
                    <span className="craft-stat-number">~20%</span>
                    <span className="craft-stat-label">
                      reduction in average call handling time
                    </span>
                  </div>
                  <div className="craft-stat">
                    <span className="craft-stat-number">3wk→2wk</span>
                    <span className="craft-stat-label">
                      new agent ramp-up time
                    </span>
                  </div>
                  <div className="craft-stat">
                    <span className="craft-stat-number">~⅓</span>
                    <span className="craft-stat-label">
                      fewer mid-call escalations from lost context
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3>The outcome</h3>
                <p>
                  Agents handled calls with far fewer context switches, new
                  agents onboarded faster, and the design system it produced
                  became the foundation the rest of the product was built
                  on afterward.
                </p>
              </div>
            </div>

            <p className="craft-note">
              A note on the visuals: the screens shown below reflect the
              user flow and interaction design from my work on this
              project. The visual UI and design system in the live software
              have moved on since and no longer match these screens as of
              now.
            </p>
          </div>
        </details>

        {/* ================= FUTUREHOME ================= */}
        <details
          id="futurehome"
          className="craft-case accordion-section"
          open={openMap.futurehome}
          onToggle={(e) => toggle("futurehome", e.currentTarget.open)}
        >
          <summary className="craft-case-summary">
            <span className="craft-case-title">
              Futurehome — mapping a logical structure out of feature sprawl
            </span>
            <span className="craft-case-meta">
              <span className="craft-role">
                Product Design &amp; DesignOps Lead · 2022–2024
              </span>
              <span className="craft-focus">
                Information architecture, research synthesis, mobile UX
              </span>
            </span>
          </summary>

          <div className="accordion-content">
            <div className="craft-results">
              <span className="craft-results-label">Results</span>
              <p>
                Navigation cut from 12 sections to 5, ~35% fewer "where do I
                find X" support tickets, and today's energy consumption
                down to a single tap.
              </p>
            </div>

            <h3>The challenge</h3>
            <p>
              Futurehome's mobile app manages a household's energy: live
              consumption, connected devices, multiple energy sources,
              automations, a cost calculator, gamified savings challenges,
              and account settings. Every one of those had shipped as its
              own feature, dropped into the navigation wherever it fit at
              the time. There was no shared logic holding it together — so
              the app grew genuinely complicated: people (and new
              teammates) couldn't predict where anything lived, and every
              new feature made the structure a little worse. It needed a
              real information architecture, built from research rather
              than bolted on after the fact.
            </p>

            <div className="craft-section-divider" />

            <h3>My approach</h3>
            <ol className="craft-approach">
              <li>
                <strong>Started from research, not the existing menu.</strong>{" "}
                Built personas, mapped the relevant consumption and energy
                behaviors, and inventoried every feature and screen already
                shipped — so the new structure was grounded in how people
                actually think about their energy, not in how the backlog
                had accumulated.
              </li>
            </ol>

            <div className="craft-figure-block">
              <img
                src={futurehomeResearch}
                alt="Real research board: personas, research notes, key findings, and a full feature and screen inventory for the Futurehome app."
              />
              <p className="craft-figure-caption">
                Figure 1. Research and analysis — personas, findings, and a
                full feature inventory
              </p>
            </div>

            <ol className="craft-approach" start={2}>
              <li>
                <strong>Grouped features by what they were for.</strong>{" "}
                Instead of one long, flat list of everything the app could
                do, I clustered features into a small number of logical
                jobs: keeping track of consumption, controlling and
                automating devices, understanding cost, and managing the
                account.
              </li>
              <li>
                <strong>Rebuilt the screen hierarchy from the ground up.</strong>{" "}
                Turned that grouping into a real sitemap — five clear
                top-level sections instead of a sprawling, inconsistent
                menu — with every sub-screen given one obvious place to
                live.
              </li>
            </ol>

            <div className="craft-figure-block">
              <img
                src={futurehomeHierarchy}
                alt="Real screen hierarchy diagram: five top-level sections (Dashboard, Consumption control, Calculator, Settings, plus login/registration), each broken into their sub-screens."
              />
              <p className="craft-figure-caption">
                Figure 2. The rebuilt screen hierarchy — five logical
                sections, replacing an unpredictable structure
              </p>
            </div>

            <ol className="craft-approach" start={4}>
              <li>
                <strong>Prototyped every screen against the new structure.</strong>{" "}
                Wireframed the full flow — login through dashboard,
                consumption, events, automations, calculator, and settings —
                to pressure-test whether the new hierarchy actually held up
                screen by screen, not just as a diagram.
              </li>
              <li>
                <strong>Documented the structure for engineering.</strong>{" "}
                Annotated flows and screen specs so the team could build
                against the new architecture confidently, and so it stayed
                consistent as new features were added after handoff.
              </li>
            </ol>

            <div className="craft-figure-block">
              <img
                src={futurehomePrototype}
                alt="Real mockups and prototype screens across Login, Dashboard, Consumption, Events, Automations, Calculator, and Settings, built against the new screen hierarchy."
              />
              <p className="craft-figure-caption">
                Figure 3. Mockups and prototype — every screen built against
                the new structure
              </p>
            </div>

            <div className="craft-section-divider" />

            <div className="craft-impact-outcome">
              <div>
                <h3>The impact</h3>
                <div className="craft-stats">
                  <div className="craft-stat">
                    <span className="craft-stat-number">12→5</span>
                    <span className="craft-stat-label">
                      top-level sections, down from a sprawling, inconsistent
                      menu
                    </span>
                  </div>
                  <div className="craft-stat">
                    <span className="craft-stat-number">~35%</span>
                    <span className="craft-stat-label">
                      fewer "where do I find X" support tickets
                    </span>
                  </div>
                  <div className="craft-stat">
                    <span className="craft-stat-number">3→1</span>
                    <span className="craft-stat-label">
                      taps to see today's energy consumption
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3>The outcome</h3>
                <p>
                  A navigation model grounded in real research instead of
                  accumulated feature decisions — one people could predict,
                  new teammates could learn quickly, and engineering could
                  build against with a documented structure that kept
                  holding up as new features were added after I handed it
                  off.
                </p>
              </div>
            </div>
          </div>
        </details>

        {/* ================= AIRTHINGS ================= */}
        <details
          id="airthings"
          className="craft-case accordion-section"
          open={openMap.airthings}
          onToggle={(e) => toggle("airthings", e.currentTarget.open)}
        >
          <summary className="craft-case-summary">
            <span className="craft-case-title">
              Airthings — from "scientific" to human
            </span>
            <span className="craft-case-meta">
              <span className="craft-role">
                End-to-end UX · Concept work, recruitment exercise
              </span>
              <span className="craft-focus">
                Personas, onboarding, information design, design process
              </span>
            </span>
          </summary>

          <div className="accordion-content">
            <div className="craft-results">
              <span className="craft-results-label">Results</span>
              <p>
                A concept redesign — persona-grounded principles, a
                friendlier onboarding, and a repeatable design process —
                built for a recruitment exercise and not yet validated with
                real users.
              </p>
            </div>

            <h3>The challenge</h3>
            <p>
              Airthings' radon-monitoring app looks and feels "scientific."
              The task: evolve it into something more personal and
              relevant — an experience that fits a health and wellness
              brand. You can't humanise a product without the people using
              it, and Airthings already has an engaged user base that gives
              feedback — so my approach was to listen first, then design.
              Not redecorating a scientific app, but reframing what it's
              for: helping people feel good about their home's air.
            </p>

            <div className="craft-section-divider" />

            <h3>My approach</h3>
            <ol className="craft-approach">
              <li>
                <strong>
                  Reframed around how people feel, not just the data.
                </strong>{" "}
                Instead of leading with sensor readings, I grounded the
                redesign in how people feel about the air they breathe —
                the readings become supporting evidence, not the headline.
              </li>
              <li>
                <strong>Grounded it in six real personas, not assumptions.</strong>{" "}
                Mapped six user types — a tech-savvy homeowner, a
                health-conscious parent, an eco-friendly enthusiast, a busy
                professional, a budget-conscious renter, and a senior with
                health concerns. Each cares about air quality for a
                different reason: control, family health, sustainability,
                convenience, budget, safety. This kept the redesign
                grounded in real motivations instead of assumptions, and
                made feature priorities easy to defend.
              </li>
            </ol>

            <div className="craft-figure-block">
              {airthingsPersonas ? (
                <>
                  <img
                    src={airthingsPersonas}
                    alt="Six personas: Tech-Savvy Homeowner, Health-Conscious Parent, Eco-Friendly Enthusiast, Busy Professional, Budget-Conscious Renter, and Senior Citizen with health concerns — each with their motivation and goals."
                  />
                  <p className="craft-figure-caption">
                    Figure 1. The six personas driving the redesign
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Personas board goes here (<code>personas.png</code> in{" "}
                  <code>app/assets/craft/airthings/</code>).
                </div>
              )}
            </div>

            <ol className="craft-approach" start={3}>
              <li>
                <strong>Set a design direction from four principles.</strong>
                <ul className="craft-approach">
                  <li>
                    <strong>Lead with the brand, not the science.</strong>{" "}
                    Airthings is already calm, modern and stylish — I leaned
                    into that with a consistent design system, soft imagery
                    and inclusive visuals.
                  </li>
                  <li>
                    <strong>Make the science digestible.</strong> Turn raw
                    readings into plain-language insight, so users grasp
                    what radon or CO₂ means for them without a chemistry
                    lesson.
                  </li>
                  <li>
                    <strong>Talk like a human.</strong> Empathetic,
                    actionable notifications ("here's what this means for
                    you") instead of clinical alerts.
                  </li>
                  <li>
                    <strong>Support the whole wellness journey.</strong>{" "}
                    Personal dashboards, goals, progress over time, and
                    gentle wellness touches like guided breathing.
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Rebuilt onboarding to invite exploration before commitment.
                </strong>{" "}
                The onboarding welcomes users, explains key terms in
                friendly language, and lets them explore the app before
                connecting a device — positive tone, simple illustrations,
                no information overload.
              </li>
            </ol>

            <div className="craft-figure-block">
              {airthingsOnboarding ? (
                <>
                  <img
                    src={airthingsOnboarding}
                    alt="Onboarding flow: welcome screen, how to use the app, key terms explained in plain language, and a final setup step."
                  />
                  <p className="craft-figure-caption">
                    Figure 2. Onboarding — explore before connecting a device
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Onboarding screens go here (<code>onboarding.png</code> in{" "}
                  <code>app/assets/craft/airthings/</code>).
                </div>
              )}
            </div>

            <ol className="craft-approach" start={5}>
              <li>
                <strong>
                  Rebuilt the everyday experience around wellbeing, not raw
                  data.
                </strong>{" "}
                Room-level air quality at a glance, a knowledge centre for
                the curious, clear trends over time, and a personal summary
                that treats air quality as part of overall wellbeing.
              </li>
            </ol>

            <div className="craft-figure-block">
              {airthingsEveryday ? (
                <>
                  <img
                    src={airthingsEveryday}
                    alt="Everyday screens: a lock-screen air quality notification, a room-level air quality summary with a knowledge centre, a contaminant trend chart, and a personal wellness summary."
                  />
                  <p className="craft-figure-caption">
                    Figure 3. Everyday screens — room air quality, trends,
                    and a personal summary
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Everyday screens go here (<code>everyday.png</code> in{" "}
                  <code>app/assets/craft/airthings/</code>).
                </div>
              )}
            </div>

            <ol className="craft-approach" start={6}>
              <li>
                <strong>
                  Sketched cheaply before committing to high-fidelity
                  screens.
                </strong>{" "}
                Quick hand sketches to explore layouts and ideas before
                committing to high-fidelity design.
              </li>
            </ol>

            <div className="craft-figure-block">
              {airthingsSketches ? (
                <>
                  <img
                    src={airthingsSketches}
                    alt="Free-hand sketches of app screens: lock screen, room air quality, an article, focus settings, a living room radon chart, mindfulness, and a summary."
                  />
                  <p className="craft-figure-caption">
                    Figure 4. Free-hand sketches — exploring ideas and the
                    current app before committing to high-fidelity design
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Low-fi sketches go here (<code>sketches.png</code> in{" "}
                  <code>app/assets/craft/airthings/</code>).
                </div>
              )}
            </div>

            <ol className="craft-approach" start={7}>
              <li>
                <strong>
                  Framed the redesign as a repeatable process, not a
                  one-off.
                </strong>{" "}
                From business requirement and user research, through
                iteration, low- and high-fidelity design, collaboration,
                testing and post-release follow-up — a loop, not a single
                pass.
              </li>
            </ol>

            <div className="craft-figure-block">
              {airthingsProcess ? (
                <>
                  <img
                    src={airthingsProcess}
                    alt="Design process flow: from business requirement and user research, through iterations, low-fi and high-fi design, collaboration, testing, release, and post-release follow-up, looping back into the next iteration."
                  />
                  <p className="craft-figure-caption">
                    Figure 5. The design process as a repeatable loop
                  </p>
                </>
              ) : (
                <div className="craft-visual-pending">
                  Design process flow goes here (<code>process.png</code> in{" "}
                  <code>app/assets/craft/airthings/</code>).
                </div>
              )}
            </div>

            <div className="craft-section-divider" />

            <div className="craft-impact-outcome">
              <div>
                <h3>The impact</h3>
                <p>
                  This was concept work for a recruitment exercise, not a
                  shipped product, so there's no production impact to
                  report. Ideas like gamification, badges, and community
                  testimonials could deepen engagement, but I flagged them
                  as hypotheses to test with real users rather than
                  features to ship on assumption — knowing what not to ship
                  yet is part of the job.
                </p>
              </div>
              <div>
                <h3>The outcome</h3>
                <p>
                  A reframed product direction grounded in six real
                  personas, a friendlier onboarding, an everyday experience
                  built around wellbeing rather than raw sensor data, and a
                  repeatable design process — moving Airthings from feeling
                  "scientific" to feeling personal.
                </p>
              </div>
            </div>
          </div>
        </details>
      </section>
    </main>
  );
}

export default Craft;
