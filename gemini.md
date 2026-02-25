---
project_name: "PRISM"
version: "1.0"
status: "Development"
---

# 🎯 OBIETTIVO DEL PROGETTO
Prism sarà un HUB che raccoglierà molteplici progetti in ambiente Multiversx. Sarà una pagina web dinamica che permetterà di visualizzare tutti i progetti divisi per categorie attraverso mini schede personalizzabili. 

# 🛠️ ARCHITETTURA (L'ecosistema che hai creato)

## Skills Collegate
- **Skill 1:** @UX - Serve per creare la struttura e il design della pagina web.
- **Skill 2:** @Multiversx - Serve per creare i smart contract e i dapp.

## Logica di Esecuzione (Workflow)
L'agente deve seguire le sue @rules per capire come agire.
L'agente deve seguire il suo @workflow per capire come agire.
L'agente deve seguire le sue @skills per capire come agire.
L'agente deve eseguire le istruzioni in ordine.

**Struttura del progetto**

Il progetto è strutturato come segue:

Una pagina che si ispira a https://skillsmp.com/ ma con un design moderno che usa Modern UI. La pagina deve avere light theme di default ma deve permettere di passare al dark theme. Di sequito ti lascio i colori che andremo a utilizzare.


Dovrà esserci una sezione header che introduce l'HUB e i suoi scopi. Con una immagine che rappresenta l'HUB dei progetti su rete Multiversx. 

Sotto l'header ci sarà una barra di navigazione e ricerca che permetterà di cercare i progetti per nome, categoria o tag. 

Soto la barra di navigaizone tutte le schede con i progetti veri e propri. 

La navbar dovrà essere dinamica e dovrà permettere di filtrare i progetti per categoria o tag. Quando un utente selezionerà una catergoria si dovranno vedere solo i progetti di quella categoria. Il passaggio tra una categoria e l'altra dovrà esssere smooth e con dissolvenze non troppo pesanti. Usa sempre @UX per creare la struttura e il design della pagina web e Modern UI per il design. 

L'obbiettivo e di creare un hub davvero moderno e aperto a tutti i progetti Multiversx attivi. 

**Colori che andremo a utilizzare**

Dark theme:
      Primary: "#60A5FA", usage: "CTA, links, accenti principali" },
      secondary: { name: "Secondary", value: "#A78BFA", usage: "Badge, etichette, accenti secondari" },
      accent: { name: "Accent", value: "#22D3EE", usage: "Highlights, notifiche positive" },
      success: { name: "Success", value: "#34D399", usage: "Messaggi di successo, valori positivi" },
      warning: { name: "Warning", value: "#FBBF24", usage: "Alert, attenzione" },
      error: { name: "Error", value: "#F87171", usage: "Errori, valori negativi" },
      background: { name: "Background", value: "#0F172A", usage: "Sfondo principale" },
      surface: { name: "Surface", value: "#1E293B", usage: "Card, contenitori elevati" },
      surfaceHover: { name: "Surface Hover", value: "#334155", usage: "Hover state delle card" },
      border: { name: "Border", value: "#334155", usage: "Bordi, divisori" },
      textPrimary: { name: "Text Primary", value: "#F8FAFC", usage: "Testo principale" },
      textSecondary: { name: "Text Secondary", value: "#94A3B8", usage: "Testo secondario, label" },
      textTertiary: { name: "Text Tertiary", value: "#64748B", usage: "Testo disabilitato, placeholder" 

Light Theme: 

      Primary: { name: "Primary", value: "#3B82F6", usage: "CTA, links, accenti principali" },
      secondary: { name: "Secondary", value: "#8B5CF6", usage: "Badge, etichette, accenti secondari" },
      accent: { name: "Accent", value: "#06B6D4", usage: "Highlights, notifiche positive" },
      success: { name: "Success", value: "#10B981", usage: "Messaggi di successo, valori positivi" },
      warning: { name: "Warning", value: "#F59E0B", usage: "Alert, attenzione" },
      error: { name: "Error", value: "#EF4444", usage: "Errori, valori negativi" },
      background: { name: "Background", value: "#FFFFFF", usage: "Sfondo principale" },
      surface: { name: "Surface", value: "#F8FAFC", usage: "Card, contenitori elevati" },
      surfaceHover: { name: "Surface Hover", value: "#F1F5F9", usage: "Hover state delle card" },
      border: { name: "Border", value: "#E2E8F0", usage: "Bordi, divisori" },
      textPrimary: { name: "Text Primary", value: "#0F172A", usage: "Testo principale" },
      textSecondary: { name: "Text Secondary", value: "#64748B", usage: "Testo secondario, label" },
      textTertiary: { name: "Text Tertiary", value: "#94A3B8", usage: "Testo disabilitato, placeholder"

Il logo dovrà essere unico e moderno e dovrebbe essere facilmente riconoscibile. L'idea è che il logo rappresenti un fulmine e una stella: ⚡️✨

**indicazioni sullo sviluppo**

- se necessario ovrai utilizzare le API ufficiali di multiversx per accedere ai dati di multiversx.
- se ci sarà bisogno di ulteriori strumenti e tecnologie dovrai suggerirmeli e aggiungerli qui seguendomi passo dopo passo in tutte le inicazioni.
- lavoreremo in italiano ma dovrai sviluppare il progetto in inglese.
- Dovrai fare molta attenzione ai dettagli soprattutto nella creazione della UI e nella creazione del backend.
- Per questo progetto dovrai imparare dai tuoi errori e correggerli e se ci saranno novità durante il percorso, appena ti chiederò qualcosa di attinente dovrai segnalarmele.
- Tutto il progetto dovrà essere modulare e semplice per permettere un facile aggiornamento e aggiunta di nuove funzionalità.
- Ogni qual volta che finirai un processo non avviare il test con il browser ma invitami a testarlo personalmente. 
- Per questo processo dovrai compilare un file readme sia in italiano che in inglese generando istruzioni dettagliate. 
- Per questo processo dovrai compilare un file changelog sia in italiano che in inglese generando istruzioni dettagliate.
- Per questo progetto dovrai creare un piano di lavoro dettagliato e condividerlo con me per approvazione.

Considera che è il mio primo progetto insieme a te. Sii coerente e cerca di mantenermi aggiornato su tutto il processo. Non avere fretta e non avere fretta di finire il processo. Prenditi il tuo tempo e assicurati di fare un buon lavoro. 


**indicazione carta**

Una pagina che permette di trasformare qualsiasi NFTs su rete MultiversX in una carta. Ragioniamo sempre in modalità “mobile first” 

La maggior parte degli NFTs sono in formato quadrato. Questo strumento deve trasformare l’NFT in una carta. 

Come? 

La pagina deve mostrare la struttura di una carta da gioco con al centro un placeholder. 

L’utente che si logga potrà selezionare e scegliere tra i suoi NFTS uno da trasformare in carta. 

L’NFT scelto si andrà a posizionare all’interno della carta nel placeholder e diventerà a tutti gli effetti una carta. 

L’ideale è costruire la carta in formato SVG in maniera tale che possa essere animata. La carta deve ruotare sensibilmente mostrandosi animata. 

Deve essere un componente presente nella pagina ma indipendente con uno stile flat e bordi lievemente marcati al fine di dare un tocco premium alla carta. 
La carta deve generare una lieve ombra dietro di sé 

La carta deve cambiare colore in base ai punti xp ottenuti dall’nft. 

Ogni carta generata dovrà essere scaricabile in formato PNG. 

La carta deve recuperare i dati dell’NFT e mostrare il titolo nella parte superiore e il numero dell’NFT nella collezione. 

Sotto l’NFT devono apparire le proprietà dell’NFT ma soprattutto ogni carta deve avere dei punti xp. 

Come ottenere i punti xp? 

I punti xp dovranno essere dedotti dai voti che gli nfts prendono sul marketplace OOX. Più un singolo NFTs ha voti, più punti xp ha la carta. 
fonte da cui trarre ispirazione
      