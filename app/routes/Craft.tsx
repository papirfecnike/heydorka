import { useEffect, useRef, useState } from "react";
import "./Craft.css";
import type { Route } from "../+types/root";

import elOld1 from "../assets/craft/elementlogic/el_old_01.png";
import elOld2 from "../assets/craft/elementlogic/el_old_02.png";
import elOld3 from "../assets/craft/elementlogic/el_old_03.png";
import elNew1 from "../assets/craft/elementlogic/el_new_01.png";
import elNew2 from "../assets/craft/elementlogic/el_new_02.png";
import elNew3 from "../assets/craft/elementlogic/el_new_03.png";
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

type SectionId = "elementlogic" | "futurehome" | "vcclive";

function Craft() {
  const [openMap, setOpenMap] = useState<Record<SectionId, boolean>>({
    elementlogic: true,
    futurehome: false,
    vcclive: false,
  });

  // Accordion group: opening one case study closes the others.
  const toggle = (id: SectionId, open: boolean) => {
    setOpenMap(
      open
        ? {
            elementlogic: id === "elementlogic",
            futurehome: id === "futurehome",
            vcclive: id === "vcclive",
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
      // Skip the very first run — Element Logic starts open by
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
        <h1>Craft</h1>

        {/* ================= ELEMENT LOGIC ================= */}
        <details
          id="elementlogic"
          className="craft-case accordion-section"
          open={openMap.elementlogic}
          onToggle={(e) => toggle("elementlogic", e.currentTarget.open)}
        >
          <summary className="craft-case-summary">
            <span className="craft-case-title">
              Element Logic — redesigning putaway with the design system
            </span>
            <span className="craft-case-meta">
              <span className="craft-role">
                Senior UX Designer → Head of Design · 2024–present
              </span>
              <span className="craft-focus">
                Flow redesign, UI redesign, applying the design system
              </span>
            </span>
          </summary>

          <div className="accordion-content">
            <h3>The challenge</h3>
            <p>
              Putaway is one of the most repeated tasks in eManager — the
              flow warehouse staff use to confirm where and how much of an
              item gets stored. The screens behind it had aged: dense
              tables holding scan, product, and quantity data all at once,
              mismatches handled through native-style pop-up dialogs, and a
              selection screen built from ad-hoc filters and an unstyled
              results table. None of it was broken exactly, but it asked
              people doing a fast, repetitive job to do too much reading
              and interpreting on every single task.
            </p>

            <h3>My approach</h3>
            <ol className="craft-approach">
              <li>
                <strong>Mapped the existing flow end to end.</strong>{" "}
                Documented how putaway actually worked from the perspective
                of the person running it on the warehouse floor, not just
                what the existing screens showed.
              </li>
              <li>
                <strong>Rebuilt it around three clear steps.</strong> Instead
                of one dense screen asking for everything at once, I split
                the task into <em>where</em>, <em>how many</em>, and{" "}
                <em>what</em> — so at any point, a worker knows exactly what
                they're being asked and why.
              </li>
              <li>
                <strong>Applied Element Logic's existing design system.</strong>{" "}
                Every component in the new screens — buttons, status pills,
                cards, tables — came from the design system already in
                place. My work was choosing and assembling the right pieces
                for this flow, not designing the system itself.
              </li>
              <li>
                <strong>Rebuilt the supporting list and table views.</strong>{" "}
                A real search field, consistent status pills, and proper
                pagination replaced the ad-hoc filters and native dialogs.
              </li>
              <li>
                <strong>Tested it against real warehouse tasks.</strong>{" "}
                Validated the new flow with the people who'd actually be
                running it before it shipped.
              </li>
            </ol>

            <p className="craft-note">
              A note on the design system: I used the predefined design
              system components during the whole process. My role here was
              applying and composing those existing components into a
              clearer layout template, UX flow and UI.
            </p>

            <ImageCarousel
              images={[elNew1, elNew2, elNew3]}
              altPrefix="Redesigned Putaway screen"
            />

            <div className="craft-section-divider" />

            <h3>A note on process</h3>
            <p>
              This flow and these screens were designed the traditional
              way — through careful research and testing with real
              customers, and close collaboration with the product trio
              internally. As the agentic era has taken hold, our R&amp;D
              and UX teams have started experimenting much more with
              AI-assisted approaches to design and development, so this
              particular flow may not end up being the final version of
              Putaway going forward.
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
      </section>
    </main>
  );
}

export default Craft;
