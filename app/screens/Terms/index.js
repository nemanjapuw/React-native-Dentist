import React, { Component } from "react";
import { View, CheckBox, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor, Images, Icons } from "@config";
import { Header, Icon, Button, Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { connect } from "react-redux";
import { AuthActions, apiActions } from "@actions";
import { bindActionCreators } from "redux";
import Toast from 'react-native-easy-toast';

const increase_number = 1;
class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan_count: 0,
            lab_count: 0,
            total_pay: 0,
            patient_count: 0,
            total_score: 0,
            lab: 0,
            loading: false
        };
    }
    // visit
    onVisit(item) {
        if (item === 'dental_plan') this.props.navigation.navigate('DentalPlan', { cond: 'plan' });
        if (item === 'dental_lab') this.props.navigation.navigate('DentalPlan', { cond: 'lab' });
    }

    getDash() {
        this.setState({ loading: true }, () => {
            this.props.actions.apiActions.getDash(response => {
                if (response.success) {
                    let item = response.item;
                    this.setState({
                        plan_count: item.plan_count,
                        lab_count: item.lab_count,
                        total_pay: item.total_pay,
                        patient_count: item.patient_count,
                        total_price: item.total_price,
                        total_score: item.total_score,
                        lab: item.lab
                    });

                }
                this.setState({ loading: false });
            });
        });
    }

    componentDidMount() {
        this.getDash();
    }


    componentDidUpdate(prevProps) {

        if (this.props != prevProps) {
            this.getDash();
        }

    }

    onInstruction() {
        this.props.navigation.navigate('Instruction');
    }
    render() {
        const { navigation } = this.props;
        let { loading, plan_count, lab_count, total_pay, patient_count, total_score, lab } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Toast
                    ref="toast"
                    position='top'
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    style={{ backgroundColor: BaseColor.kashmir }}
                    textStyle={{ color: BaseColor.whiteColor, fontWeight: "bold" }}
                />

                <View style={styles.container}>
                    <ImageBackground source={Images.signin_back} style={styles.signup_back}>
                        <View style={[styles.topview, { marginTop: 20 }]}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DentalNew'); }}>
                                <Image source={Icons.icon_left_arrow} style={{ marginTop: 7, width: 30, height: 30, borderRadius: 2 }} />
                            </TouchableOpacity>
                            <Text style={styles.main_text}>
                                {Utils.translate("dentalnew.terms")}
                            </Text>
                        </View>
                        <View style={[styles.main_contain, { textAlign: 'left' }]}>
                            <ScrollView>
                                <Text style={styles.text1}>
                                    VISÃO GERAL
                            </Text>
                                <Text style={styles.text}>
                                    Esse APLICATIVO é operado pelo DIGITAL ESTETHIC CENTER. Em todo o APLICATIVO, os termos “nós”, “nos” e “nosso” se referem ao DIGITAL ESTETHIC CENTER. O DIGITAL ESTETHIC CENTER proporciona esse APLICATIVO, incluindo todas as informações, ferramentas e serviços disponíveis deste APLICATIVO para você, o usuário, com a condição da sua aceitação de todos os termos, condições, políticas e avisos declarados aqui.
                            </Text>
                                <Text style={styles.text}>
                                    Ao visitar nosso APLICATIVO e/ou comprar alguma coisa no nosso APLICATIVO, você está utilizando nossos “Serviços”. Consequentemente, você  concorda com os seguintes termos e condições (“Termos de serviço”, “Termos”), incluindo os termos e condições e políticas adicionais mencionados neste documento e/ou disponíveis por hyperlink. Esses Termos de serviço se aplicam a todos os usuários do APLICATIVO, incluindo, sem limitação, os usuários que são navegadores, fornecedores, clientes, lojistas e/ou contribuidores de conteúdo.
                            </Text>
                                <Text style={styles.text}>
                                    Por favor, leia esses Termos de serviço cuidadosamente antes de acessar ou utilizar o nosso APLICATIVO. Ao acessar ou usar qualquer parte do APLICATIVO, você concorda com os Termos de serviço. Se você não concorda com todos os termos e condições desse acordo, então você não pode acessar o APLICATIVO ou usar quaisquer serviços. Se esses Termos de serviço são considerados uma oferta, a aceitação é expressamente limitada a esses Termos de serviço.
                            </Text>
                                <Text style={styles.text}>
                                    Quaisquer novos recursos ou ferramentas que forem adicionados à loja atual também devem estar sujeitos aos Termos de serviço. Você pode revisar a versão mais atual dos Termos de serviço quando quiser nesta página. Reservamos o direito de atualizar, alterar ou trocar qualquer parte desses Termos de serviço ao publicar atualizações e/ou alterações no nosso APLICATIVO. É sua responsabilidade verificar as alterações feitas nesta página periodicamente. Seu uso contínuo ou acesso ao APLICATIVO após a publicação de quaisquer alterações constitui aceitação de tais alterações.
                            </Text>
                                <Text style={styles.text2}>
                                    SEÇÃO 1 - TERMOS DO APP
                            </Text>
                            <Text style={styles.text}>
                            Ao concordar com os Termos de serviço, você confirma que você é maior de idade em seu estado ou província de residência e que você nos deu seu consentimento para permitir que qualquer um dos seus dependentes menores de idade usem esse APLICATIVO.
                            </Text>
                            <Text style={styles.text}>
                            Você não deve usar nossos produtos para qualquer fim ilegal ou não autorizado. Você também não pode, ao usufruir deste Serviço, violar quaisquer leis em sua jurisdição (incluindo, mas não limitado, a leis de direitos autorais).
                            </Text>
                            <Text style={styles.text}>
                            Você não deve transmitir nenhum vírus ou qualquer código de natureza destrutiva.
                            </Text>
                            <Text style={styles.text}>
                            Violar qualquer um dos Termos tem como consequência a rescisão imediata dos seus Serviços.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 2 - CONDIÇÕES GERAIS
                            </Text>
                            <Text style={styles.text}>
                            Reservamos o direito de recusar o serviço a qualquer pessoa por qualquer motivo a qualquer momento.
                            </Text>
                            <Text style={styles.text}>
                            Você entende que o seu conteúdo (não incluindo informações de cartão de crédito), pode ser transferido sem criptografia e pode: (a) ser transmitido por várias redes; e (b) sofrer alterações para se adaptar e se adequar às exigências técnicas de conexão de redes ou dispositivos. As informações de cartão de crédito sempre são criptografadas durante a transferência entre redes.
                            </Text>
                            <Text style={styles.text}>
                            Você concorda em não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do Serviço, uso do Serviço, acesso ao Serviço, ou qualquer contato no APLICATIVO através do qual o serviço é fornecido, sem nossa permissão expressa por escrito.
                            </Text>
                            <Text style={styles.text}>
                            Os títulos usados nesse acordo são incluídos apenas por conveniência e não limitam ou  afetam os Termos.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 3 - PRECISÃO, INTEGRIDADE E ATUALIZAÇÃO DAS INFORMAÇÕES
                            </Text>
                            <Text style={styles.text}>
                            Não somos responsáveis por informações disponibilizadas nesse APLICATIVO que não sejam precisas, completas ou atuais. O material desse APLICATIVO é fornecido apenas para fins 
                            </Text>
                            <Text style={styles.text}>
                            informativos e não deve ser usado como a única base para tomar decisões sem consultar fontes de informações primárias, mais precisas, mais completas ou mais atuais. Qualquer utilização do material desse APLICATIVO é por sua conta e risco.
                            </Text>
                            <Text style={styles.text}>
                            Esse APLICATIVO pode conter certas informações históricas. As informações históricas podem não ser atuais e são fornecidas apenas para sua referência. Reservamos o direito de modificar o conteúdo desse APLICATIVO a qualquer momento, mas nós não temos obrigação de atualizar nenhuma informação em nosso APLICATIVO. Você concorda que é de sua responsabilidade monitorar alterações no nosso APLICATIVO.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 4 - MODIFICAÇÕES DO SERVIÇO E PREÇOS
                            </Text>
                            <Text style={styles.text}>
                            Os preços dos nossos produtos são sujeitos a alterações sem notificação.
                            </Text>
                            <Text style={styles.text}>
                            Reservamos o direito de, a qualquer momento, modificar ou descontinuar o Serviço (ou qualquer parte ou conteúdo do mesmo) sem notificação em qualquer momento.
                            </Text>
                            <Text style={styles.text}>
                            Não nos responsabilizados por você ou por qualquer terceiro por qualquer modificação, alteração de preço, suspensão ou descontinuação do Serviço.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 5 - PRODUTOS OU SERVIÇOS (caso aplicável)
                            </Text>
                            <Text style={styles.text}>
                            Certos produtos ou serviços podem estar disponíveis exclusivamente online através do APLICATIVO. Tais produtos ou serviços podem ter quantidades limitadas e são sujeitos a apenas devolução ou troca, de acordo com nossa Política de devolução.
                            </Text>
                            <Text style={styles.text}>
                            Fizemos todo o esforço possível da forma mais precisa as cores e imagens dos nossos produtos que aparecem na loja. Não podemos garantir que a exibição de qualquer cor no monitor do seu computador será precisa.
                            </Text>
                            <Text style={styles.text}>
                            Reservamos o direito, mas não somos obrigados, a limitar as vendas de nossos produtos ou Serviços para qualquer pessoa, região geográfica ou jurisdição. Podemos exercer esse direito conforme o caso. Reservamos o direito de limitar as quantidades de quaisquer produtos ou serviços que oferecemos. Todas as descrições de produtos ou preços de produtos são sujeitos a alteração a qualquer momento sem notificação, a nosso critério exclusivo. Reservamos o direito de descontinuar qualquer produto a qualquer momento. Qualquer oferta feita por qualquer produto ou serviço nesse APLICATIVO é nula onde for proibido por lei.
                            </Text>
                            <Text style={styles.text}>
                            Não garantimos que a qualidade de quaisquer produtos, serviços, informações ou outros materiais comprados ou obtidos por você vão atender às suas expectativas, ou que quaisquer erros no Serviço serão corrigidos.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 6 - PRECISÃO DE INFORMAÇÕES DE FATURAMENTO E CONTA
                            </Text>
                            <Text style={styles.text}>
                            Reservamos o direito de recusar qualquer pedido que você nos fizer. Podemos, a nosso próprio critério, limitar ou cancelar o número de produtos por pessoa, por domicílio ou por pedido. Tais restrições podem incluir pedidos feitos na mesma conta de cliente, no mesmo cartão de crédito, e/ou pedidos que usam a mesma fatura e/ou endereço de envio. Caso façamos alterações ou cancelemos um pedido, pode ser que o notifiquemos por e-mail e/ou endereço/número de telefone de faturamento fornecidos no momento que o pedido foi feito. Reservamos o direito de limitar ou proibir pedidos que, a nosso critério exclusivo, parecem ser feitos por comerciantes, revendedores ou distribuidores.
                            </Text>
                            <Text style={styles.text}>
                            Você concorda em fornecer suas informações de conta e compra completas para todas as compras feitas em nossa loja. Você concorda em atualizar prontamente sua conta e outras informações, incluindo seu e-mail, números de cartão de crédito e datas de validade, para que possamos completar suas transações e contatar você quando preciso.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 7 - FERRAMENTAS OPCIONAIS
                            </Text>
                            <Text style={styles.text}>
                            Podemos te dar acesso a ferramentas de terceiros que não monitoramos e nem temos qualquer controle.
                            </Text>
                            <Text style={styles.text}>
                            Você reconhece e concorda que nós fornecemos acesso a tais ferramentas ”como elas são” e “conforme a disponibilidade” sem quaisquer garantias, representações ou condições de qualquer tipo e sem qualquer endosso. Não nos responsabilizamos de forma alguma pelo seu uso de ferramentas opcionais de terceiros.
                            </Text>
                            <Text style={styles.text}>
                            Qualquer uso de ferramentas opcionais oferecidas através do APLICATIVO é inteiramente por sua conta e risco e você se familiarizar e aprovar os termos das ferramentas que são fornecidas por fornecedor(es) terceiro(s).
                            </Text>
                            <Text style={styles.text}>
                            Também podemos, futuramente, oferecer novos serviços e/ou recursos através do APLICATIVO (incluindo o lançamento de novas ferramentas e recursos). Tais recursos e/ou serviços novos também devem estar sujeitos a esses Termos de serviço.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 8 - LINKS DE TERCEIROS
                            </Text>
                            <Text style={styles.text}>
                            Certos produtos, conteúdos e serviços disponíveis pelo nosso Serviço podem incluir materiais de terceiros.
                            </Text>
                            <Text style={styles.text}>
                            Os links de terceiros nesse APLICATIVO podem te direcionar para APLICATIVOs de terceiros que não são afiliados a nós. Não nos responsabilizamos por examinar ou avaliar o conteúdo ou precisão. Não garantimos e nem temos obrigação ou responsabilidade por quaisquer materiais ou APLICATIVOs de terceiros, ou por quaisquer outros materiais, produtos ou serviços de terceiros.
                            </Text>
                            <Text style={styles.text}>
                            Não somos responsáveis por quaisquer danos ou prejuízos relacionados com a compra ou uso de mercadorias, serviços, recursos, conteúdo, ou quaisquer outras transações feitas em conexão com quaisquer APLICATIVOs de terceiros. Por favor, revise com cuidado as políticas e práticas de terceiros e certifique-se que você as entende antes de efetuar qualquer transação. As queixas, reclamações, preocupações ou questões relativas a produtos de terceiros devem ser direcionadas ao terceiro.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 9 - COMENTÁRIOS, FEEDBACK, ETC. DO USUÁRIO
                            </Text>
                            <Text style={styles.text}>
                            Se, a nosso pedido, você enviar certos itens específicos (por exemplo, participação em um concurso), ou sem um pedido nosso, você enviar ideias criativas, sugestões, propostas, planos, ou outros materiais, seja online, por e-mail, pelo correio, ou de outra forma (em conjunto chamados de 'comentários'), você concorda que podemos, a qualquer momento, sem restrição, editar, copiar, publicar, distribuir, traduzir e de outra forma usar quaisquer comentários que você encaminhar para nós. Não nos responsabilizamos por: (1) manter quaisquer comentários em sigilo; (2) indenizar por quaisquer comentários; ou (3) responder quaisquer comentários.
                            </Text>
                            <Text style={styles.text}>
                            Podemos, mas não temos a obrigação, de monitorar, editar ou remover conteúdo que nós determinamos a nosso próprio critério ser contra a lei, ofensivo, ameaçador, calunioso, difamatório, pornográfico, obsceno ou censurável ou que viole a propriedade intelectual de terceiros ou estes Termos de serviço.
                            </Text>
                            <Text style={styles.text}>
                            Você concorda que seus comentários não violarão qualquer direito de terceiros, incluindo direitos autorais, marcas registradas, privacidade, personalidade ou outro direito pessoal ou de propriedade. Você concorda que os seus comentários não vão conter material difamatório, ilegal, abusivo ou obsceno. Eles também não conterão nenhum vírus de computador ou outro malware que possa afetar a operação do Serviço ou qualquer APLICATIVO relacionado. Você não pode usar um endereço de e-mail falso, fingir ser alguém diferente de si mesmo, ou de outra forma enganar a nós ou terceiros quanto à origem de quaisquer comentários. Você é o único responsável por quaisquer comentários que você faz e pela veracidade deles. Nós não assumimos qualquer responsabilidade ou obrigação por quaisquer comentários publicados por você ou por qualquer terceiro.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 10 - INFORMAÇÕES PESSOAIS
                            </Text>
                            <Text style={styles.text}>
                            O envio de suas informações pessoais através do  nosso app é regido pela nossa Política de privacidade. Ver nossa Política de privacidade.
                            </Text>
                            <Text style={styles.text2}>
                            SEÇÃO 11 - ERROS, IMPRECISÕES E OMISSÕES
                            </Text>
                            <Text style={styles.text}>
                            Ocasionalmente, pode haver informações no nosso APLICATIVO ou no Serviço que contém erros tipográficos, imprecisões ou omissões que possam relacionar-se a descrições de produtos, preços, promoções, ofertas, taxas de envio do produto, o prazo de envio e disponibilidade. Reservamos o direito de corrigir quaisquer erros, imprecisões ou omissões, e de alterar ou atualizar informações ou cancelar encomendas caso qualquer informação no Serviço ou em qualquer APLICATIVO relacionado seja imprecisa, a qualquer momento e sem aviso prévio (até mesmo depois de você ter enviado o seu pedido).
                            </Text>
                            <Text style={styles.text}>                            
                            Não assumimos nenhuma obrigação de atualizar, alterar ou esclarecer informações no Serviço ou em qualquer APLICATIVO relacionado, incluindo, sem limitação, a informações sobre preços, exceto conforme exigido por lei. Nenhuma atualização específica ou data de atualização no Serviço ou em qualquer APLICATIVO relacionado, deve ser utilizada para indicar que todas as informações do Serviço ou em qualquer APLICATIVO relacionado tenham sido modificadas ou atualizadas.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 12 - USOS PROIBIDOS
                            </Text>
                            <Text style={styles.text}>                            
                            Além de outras proibições, conforme estabelecido nos Termos de serviço, você está proibido de usar o APLICATIVO ou o conteúdo para: (a) fins ilícitos; (b) solicitar outras pessoas a realizar ou participar de quaisquer atos ilícitos; (c) violar quaisquer regulamentos internacionais, provinciais, estaduais ou federais, regras, leis ou regulamentos locais; (d) infringir ou violar nossos direitos de propriedade intelectual ou os direitos de propriedade intelectual de terceiros; (e) para assediar, abusar, insultar, danificar, difamar, caluniar, depreciar, intimidar ou discriminar com base em gênero, orientação sexual, religião, etnia, raça, idade, nacionalidade ou deficiência; (f) apresentar informações falsas ou enganosas; (g) fazer o envio ou transmitir vírus ou qualquer outro tipo de código malicioso que será ou poderá ser utilizado para afetar a funcionalidade ou operação do Serviço ou de qualquer APLICATIVO relacionado, outros APLICATIVOs, ou da Internet; (h) coletar ou rastrear as informações pessoais de outras pessoas; (i) para enviar spam, phishing, pharm, pretext, spider, crawl, ou scrape; (j) para fins obscenos ou imorais; ou (k) para interferir ou contornar os recursos de segurança do Serviço ou de qualquer APLICATIVO relacionado, outros APLICATIVOs, ou da Internet. Reservamos o direito de rescindir o seu uso do Serviço ou de qualquer APLICATIVO relacionado por violar qualquer um dos usos proibidos.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 13 - ISENÇÃO DE RESPONSABILIDADE DE GARANTIAS; LIMITAÇÃO DE RESPONSABILIDADE
                            </Text>
                            <Text style={styles.text}>                            
                            Nós não garantimos, representamos ou justificamos que o seu uso do nosso serviço será pontual, seguro, sem erros ou interrupções.
                            </Text>
                            <Text style={styles.text}>                            
                            Não garantimos que os resultados que possam ser obtidos pelo uso do serviço serão precisos ou confiáveis.
                            </Text>
                            <Text style={styles.text}>                            
                            Você concorda que de tempos em tempos, podemos remover o serviço por períodos indefinidos de tempo ou cancelar a qualquer momento, sem te notificar.
                            </Text>
                            <Text style={styles.text}>                            
                            Você concorda que o seu uso ou incapacidade de usar o serviço é por sua conta e risco. O serviço e todos os produtos e serviços entregues através do serviço são, exceto conforme declarado por nós) fornecidos sem garantia e conforme a disponibilidade para seu uso, sem qualquer representação, garantias ou condições de qualquer tipo, expressas ou implícitas, incluindo todas as garantias implícitas ou condições de comercialização, quantidade, adequação a uma finalidade específica, durabilidade, título, e não violação.
                            </Text>
                            <Text style={styles.text}>                            
                            Em nenhuma circunstância o DIGITAL ESTETHIC CENTER, nossos diretores, oficiais, funcionários, afiliados, agentes, contratantes, estagiários, fornecedores, prestadores de serviços ou licenciadores serão responsáveis por qualquer prejuízo, perda, reclamação ou danos diretos, indiretos, incidentais, punitivos, especiais ou consequentes de qualquer tipo, incluindo, sem limitação, lucros cessantes, perda de receita, poupanças perdidas, perda de dados, custos de reposição, ou quaisquer danos semelhantes, seja com base em contrato, ato ilícito (incluindo negligência), responsabilidade objetiva ou de outra forma, decorrentes do seu uso de qualquer um dos serviços ou quaisquer produtos adquiridos usando o serviço, ou para qualquer outra reclamação relacionada de alguma forma ao seu uso do serviço ou qualquer produto, incluindo, mas não limitado a, quaisquer erros ou omissões em qualquer conteúdo, ou qualquer perda ou dano de qualquer tipo como resultado do uso do serviço ou qualquer conteúdo (ou produto) publicado, transmitido ou de outra forma disponível através do serviço, mesmo se alertado de tal possibilidade. Como alguns estados ou jurisdições não permitem a exclusão ou a limitação de responsabilidade por danos consequentes ou incidentais, em tais estados ou jurisdições, a nossa responsabilidade será limitada à extensão máxima permitida por lei.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 14 - INDENIZAÇÃO
                            </Text>
                            <Text style={styles.text}>                            
                            Você concorda em indenizar, defender e isentar DIGITAL ESTETHIC CENTER e nossos subsidiários, afiliados, parceiros, funcionários, diretores, agentes, contratados, licenciantes, prestadores de serviços, subcontratados, fornecedores, estagiários e funcionários, de qualquer reclamação ou demanda, incluindo honorários de advogados, por quaisquer terceiros devido à violação destes Termos de serviço ou aos documentos que incorporam por referência, ou à violação de qualquer lei ou os direitos de um terceiro.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 15 - INDEPENDÊNCIA
                            </Text>
                            <Text style={styles.text}>                            
                            No caso de qualquer disposição destes Termos de serviço ser considerada ilegal, nula ou ineficaz, tal disposição deve, contudo, ser aplicável até ao limite máximo permitido pela lei aplicável, e a porção inexequível será considerada separada desses Termos de serviço. Tal determinação não prejudica a validade e aplicabilidade de quaisquer outras disposições restantes.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 16 - RESCISÃO
                            </Text>
                            <Text style={styles.text}>                            
                            As obrigações e responsabilidades das partes incorridas antes da data de rescisão devem continuar após a rescisão deste acordo para todos os efeitos.
                            </Text>
                            <Text style={styles.text}>                            
                            Estes Termos de Serviço estão em vigor, a menos que seja rescindido por você ou por nós. Você pode rescindir estes Termos de serviço a qualquer momento, notificando-nos que já não deseja utilizar os nossos serviços, ou quando você deixar de usar o nosso APLICATIVO.
                            </Text>
                            <Text style={styles.text}>                            
                            Se em nosso critério exclusivo você não cumprir com qualquer termo ou disposição destes Termos de serviço, nós também podemos rescindir este contrato a qualquer momento sem aviso prévio e você ficará responsável por todas as quantias devidas até a data da rescisão; também podemos lhe negar acesso a nossos Serviços (ou qualquer parte deles).
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 17 - ACORDO INTEGRAL
                            </Text>
                            <Text style={styles.text}>                            
                            Caso não exerçamos ou executemos qualquer direito ou disposição destes Termos de serviço, isso não constituirá uma renúncia de tal direito ou disposição.
                            </Text>
                            <Text style={styles.text}>                            
                            Estes Termos de serviço e quaisquer políticas ou normas operacionais postadas por nós neste APLICATIVO ou no que diz respeito ao serviço constituem a totalidade do acordo  entre nós. Estes termos regem o seu uso do Serviço, substituindo quaisquer acordos anteriores ou contemporâneos, comunicações e propostas, sejam verbais ou escritos, entre você e nós (incluindo, mas não limitado a quaisquer versões anteriores dos Termos de serviço).
                            </Text>
                            <Text style={styles.text}>                            
                            Quaisquer ambiguidades na interpretação destes Termos de serviço não devem ser interpretadas contra a parte que os redigiu.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 18 - LEGISLAÇÃO APLICÁVEL
                            </Text>
                            <Text style={styles.text}>                            
                            Esses Termos de serviço e quaisquer acordos separados em que nós lhe fornecemos os Serviços devem ser regidos e interpretados de acordo com as leis de Rua Dr. Amadeu da Luz, 122, sala 74, Blumenau, SC, 89010-160, Brazil.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 19 - ALTERAÇÕES DOS TERMOS DE SERVIÇO
                            </Text>
                            <Text style={styles.text}>                            
                            Você pode rever a versão mais atual dos Termos de serviço a qualquer momento nessa página.
                            </Text>
                            <Text style={styles.text}>                            
                            Reservamos o direito, a nosso critério, de atualizar, modificar ou substituir qualquer parte destes Termos de serviço ao publicar atualizações e alterações no nosso APLICATIVO. É sua responsabilidade verificar nosso APLICATIVO periodicamente. Seu uso contínuo ou acesso ao nosso APLICATIVO ou ao Serviço após a publicação de quaisquer alterações a estes Termos de serviço constitui aceitação dessas alterações.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 20 - INFORMAÇÕES DE CONTATO
                            </Text>
                            <Text style={styles.text}>                            
                            As perguntas sobre os Termos de serviço devem ser enviadas para nós através do CONTATO@DEC.COM.BR
                            </Text>
                            <Text style={[styles.text1,{paddingTop:20}]}>                            
                            POLÍTICA DE PRIVACIDADE
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 1 - O QUE FAZEMOS COM AS SUAS INFORMAÇÕES?
                            </Text>
                            <Text style={styles.text}>                            
                            Quando você compra alguma coisa na nossa loja, como parte do processo de compra e venda, coletamos as informações pessoais que você nos fornece, tais como seu nome, endereço e e-mail.
                            </Text>
                            <Text style={styles.text}>                            
                            Quando você navega pela nossa loja, recebemos também automaticamente o protocolo de internet do seu computador (endereço de IP) a fim de obter informações que nos ajudam a saber mais sobre seu navegador e sistema operacional.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 2 - CONSENTIMENTO
                            </Text>
                            <Text style={styles.text}>                            
                            Como vocês obtêm meu consentimento?
                            </Text>
                            <Text style={styles.text}>                            
                            Quando você nos fornece as suas informações pessoais para completar uma transação, verificar seu cartão de crédito, fazer um pedido, providenciar uma entrega ou retornar uma compra, você está concordando com a nossa coleta e uso de informações pessoais apenas para esses fins específicos.
                            </Text>
                            <Text style={styles.text}>                            
                            Se pedirmos suas informações pessoais por uma razão secundária, como marketing, vamos pedir seu consentimento, ou te dar a oportunidade de dizer não.
                            </Text>
                            <Text style={styles.text}>                            
                            Como posso retirar o meu consentimento?
                            </Text>
                            <Text style={styles.text}>                            
                            Caso depois de fornecer seus dados você mude de ideia, você pode retirar o seu consentimento quando quiser e assim evitar que entremos em contato para obter ou divulgar informações. Entre em contato conosco através do contato@dec.com.br  ou por correio: DIGITAL ESTETHIC CENTER Rua Dr. Amadeu da Luz, 122, sala 74, Blumenau, AC, 89010-160, Brazil
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 3 - DIVULGAÇÃO
                            </Text>
                            <Text style={styles.text}>                            
                            Podemos divulgar suas informações pessoais se formos obrigados por lei a fazê-lo ou se você violar nossos Termos de serviço.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 4 - HOSPEDAGEM
                            </Text>
                            <Text style={styles.text}>                            
                            Nossa loja é possui hospegagem própia, sendo divulgada na APPLE  e dispositivos ANDROID. Eles nos fornecem uma plataforma de e-commerce online que nos permite vender nossos produtos e serviços.
                            </Text>
                            <Text style={styles.text}>                            
                            Seus dados estão armazenados através do armazenamento de dados , de bancos de dados e do aplicativo geral próprio. Eles armazenam dados em um servidor seguro protegido por firewall.
                            </Text>
                            <Text style={styles.text}>                            
                            Pagamento:
                            </Text>
                            <Text style={styles.text}>                            
                            Se você escolher um gateway de pagamento direto para completar a sua compra, o dec armazena seus dados de cartão de crédito. Eles são criptografados através do Padrão de segurança de dados do setor de pagamento com cartão (PCI-DSS). Seus dados de transação de compra são armazenados apenas pelo período necessário para completar sua transação de compra. Depois de finalizar a compra, suas informações de transação de compra são apagadas.
                            </Text>
                            <Text style={styles.text}>                            
                            Todos os gateways de pagamento direto aderem aos padrões definidos pela PCI-DSS, que são gerenciados pelo Conselho de normas de segurança PCI. Ele é um esforço conjunto de marcas como Visa, MasterCard, American Express e Discover.
                            </Text>
                            <Text style={styles.text}>                            
                            Os requisitos da PCI-DSS ajudam a garantir a utilização segura de informações de cartão de crédito pela nossa loja e seus provedores de serviço.
                            </Text>
                            <Text style={styles.text}>                            
                            Para mais detalhes, leia os Termos de serviço ou a Política de privacidade do app DEC.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 5 - SERVIÇOS DE TERCEIROS
                            </Text>
                            <Text style={styles.text}>                            
                            No geral, nossos fornecedores terceirizados irão coletar, usar e divulgar suas informações apenas na medida do necessário para permitir que eles realizem os serviços que eles nos fornecem.
                            </Text>
                            <Text style={styles.text}>                            
                            Entretanto, certos prestadores de serviços terceirizados, tais como gateways de pagamento e outros processadores de transações de pagamento, têm suas próprias políticas de privacidade em relação à informação que somos obrigados a fornecer para eles sobre transações relacionadas a compras.
                            </Text>
                            <Text style={styles.text}>                            
                            Para esses fornecedores, recomendamos que você leia suas políticas de privacidade para que você possa entender de que maneira suas informações pessoais serão usadas por esses fornecedores.
                            </Text>
                            <Text style={styles.text}>                            
                            Especificamente, lembre-se que certos fornecedores podem estar localizados ou possuir instalações que ficam em jurisdições diferentes da sua ou da nossa. Por isso, se você quiser continuar com uma transação que envolva um prestador de serviços terceirizado, suas informações podem ficar sujeitas à legislação da(s) jurisdição(ões) onde o prestador de serviços ou suas instalações estiverem localizados.
                            </Text>
                            <Text style={styles.text}>                            
                            Por exemplo, se você está no Canadá e sua transação é processada por um gateway de pagamento nos Estados Unidos, suas informações pessoais usadas para completar a transação podem estar sujeitas a divulgação sob a legislação dos Estados Unidos, incluindo a Lei Patriótica.
                            </Text>
                            <Text style={styles.text}>                            
                            Uma vez que você sair do site da nossa loja ou for redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de privacidade ou pelos Termos de serviço do nosso site.
                            </Text>
                            <Text style={styles.text}>                            
                            Links
                            </Text>
                            <Text style={styles.text}>                            
                            Quando você clicar em links na nossa loja, eles podem lhe direcionar para fora do nosso site. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as políticas de privacidade deles.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 6 - SEGURANÇA
                            </Text>
                            <Text style={styles.text}>                            
                            Para proteger suas informações pessoais, tomamos precauções e seguimos as melhores práticas da indústria para nos certificar que elas não sejam perdidas, usurpadas, acessadas, divulgadas, alteradas ou destruídas.
                            </Text>
                            <Text style={styles.text}>                            
                            Se você nos fornecer as suas informações de cartão de crédito, elas serão criptografadas usando a tecnologia "secure socket layer" (SSL) e armazenadas com criptografia AES-256.  Embora nenhum método de transmissão pela Internet ou armazenamento eletrônico seja 100% seguro, nós seguimos todos os requisitos da PCI-DSS e implementamos medidas adicionais aceitas pelos padrões da indústria.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 7 - IDADE DE CONSENTIMENTO
                            </Text>
                            <Text style={styles.text}>                            
                            Ao usar esse app, você confirma que você é maior de idade em seu estado ou província de residência e que você nos deu seu consentimento para permitir que qualquer um dos seus dependentes menores de idade usem esse site.
                            </Text>
                            <Text style={styles.text2}>                            
                            SEÇÃO 8 - ALTERAÇÕES NA POLÍTICA DE PRIVACIDADE
                            </Text>
                            <Text style={styles.text}>                            
                            Reservamos o direito de modificar essa política de privacidade a qualquer momento. Portanto, por favor, leia-a com frequência. As alterações e esclarecimentos surtem efeito imediatamente após serem publicadas no site. Caso façamos alterações na política de privacidade, iremos notificá-lo sobre a atualização. Assim, você saberá quais informações coletamos, como as usamos, e sob que circunstâncias, caso aplicável, as utilizaremos e/ou divulgaremos
                            </Text>
                            <Text style={styles.text}>                            
                            Caso ocorra a fusão da nossa loja com outra empresa, suas informações podem ser transferidas para os novos proprietários para que possamos continuar vendendo produtos para você.
                            </Text>
                            <Text style={styles.text2}>                            
                            DEVOLUÇÃO
                            </Text>
                            <Text style={styles.text}>                            
                            Nossa política de devolução é de 30 dias. Passados os 30 dias da compra, infelizmente não é possível solicitar reembolso ou troca.
                            </Text> 
                            <Text style={styles.text}>                            
                            Para poder efetuar a devolução, o produto não pode ter sido usado e deve estar nas mesmas condições que você o recebeu. Ele também deve estar na embalagem original.
                            </Text> 
                            <Text style={styles.text}>                            
                            Vários tipos de mercadorias estão isentos de devolução. Produtos perecíveis, tais como alimentos, flores, jornais ou revistas não podem ser devolvidos. Nós também não aceitamos produtos íntimos ou sanitários, materiais perigosos, líquidos ou gases inflamáveis.
                            </Text> 
                            <Text style={styles.text}>                            
                            Itens adicionais que não podem ser devolvidos:
                            </Text> 
                            <Text style={styles.text}>                            
                            * Cartões presente
                            </Text> 
                            <Text style={styles.text}>                            
                            * Produtos de software para download
                            </Text> 
                            <Text style={styles.text}>                            
                            * Alguns itens de higiene pessoal e de saúde
                            </Text> 
                            <Text style={styles.text}>                            
                            Para efetuar a devolução, apresente o recibo ou comprovante de compra.
                            </Text> 
                            <Text style={styles.text}>                            
                            Por favor, não envie sua compra de volta ao fabricante.
                            </Text> 
                            <Text style={styles.text}>                            
                            Em certos casos, serão emitidos apenas reembolsos parciais (quando aplicável):
                            </Text> 
                            <Text style={styles.text}>                            
                            * Qualquer produto que não esteja em sua condição original, que esteja danificado ou com partes faltando, não sendo devido a qualquer erro de nossa parte.
                            </Text> 
                            <Text style={styles.text}>                            
                            * Qualquer produto que for devolvido mais de 30 dias após a entrega
                            </Text> 
                            <Text style={styles.text}>                            
                            Reembolsos (quando aplicável)
                            </Text> 
                            <Text style={styles.text}>                            
                            Uma vez que o produto para devolução for recebido e verificado, enviaremos um e-mail para notificá-lo que recebemos sua mercadoria para devolução. Também iremos notificá-lo sobre a aprovação ou rejeição do seu reembolso.
                            </Text> 
                            <Text style={styles.text}>                            
                            Caso seja aprovado, o seu reembolso será processado. Emitiremos o crédito automaticamente no seu cartão de crédito ou método de pagamento da compra em alguns dias.
                            </Text> 
                            <Text style={styles.text}>                            
                            Reembolso atrasado ou não recebido (quando aplicável)
                            </Text> 
                            <Text style={styles.text}>                            
                            Se você ainda não recebeu o reembolso, primeiro verifique sua conta bancária novamente.
                            </Text> 
                            <Text style={styles.text}>                            
                            Em seguida, entre em contato com sua empresa de cartão de crédito, já que pode demorar algum tempo até o reembolso ser lançado.
                            </Text>
                            <Text style={styles.text}>                            
                            Depois entre em contato com o seu banco. Geralmente, existe um tempo processamento antes de lançar um reembolso.
                            </Text> 
                            <Text style={styles.text}>                            
                            Se você já fez tudo isso e ainda não recebeu o reembolso, por favor, entre em contato conosco através do contato@dec.com.br
                            </Text> 
                            <Text style={styles.text}>                            
                            Mercadorias em oferta (quando aplicável)
                            </Text> 
                            <Text style={styles.text}>                            
                            Você só pode pedir o reembolso de produtos com preço normal. Infelizmente, não é possível solicitar reembolso de mercadorias em oferta.
                            </Text> 
                            <Text style={styles.text}>                            
                            Trocas (quando aplicável)
                            </Text> 
                            <Text style={styles.text}>                            
                            Só trocamos produtos que vierem com defeito ou danificados.  Se você precisar trocá-lo pelo mesmo produto, envie um e-mail para o contato@dec.com.br e envie o seu produto para:DR. AMADEU DA LUZ, 122, SALA 74 , BLUMENAU| CENTRO, SANTA CATARINA. CEP: 89010-160
                            </Text> 
                            <Text style={styles.text}>                            
                            Frete
                            </Text> 
                            <Text style={styles.text}>                            
                            Para fazer a devolução do produto, você deve enviá-lo para: Rua Dr. Amadeu da Luz, 122, sala 74, Blumenau, SC, 89010-160, Brazil.
                            </Text> 
                            <Text style={styles.text}>                            
                            Você será responsável pelo pagamento do frete para devolver o produto. Não reembolsamos o frete. Se você receber um reembolso, o custo do frete de devolução será deduzido do seu reembolso.
                            </Text> 
                            <Text style={styles.text}>                            
                            Dependendo de onde você mora, o tempo de frete de devolução pode variar.
                            </Text> 
                            <Text style={styles.text}>                            
                            Se você vai enviar um produto acima de $75, considere contratar um serviço de transporte com rastreamento ou seguro de transporte. Não podemos garantir o recebimento do  produto que você enviar de volta.
                            </Text> 
                            <Text style={styles.text}>                            
                            PERGUNTAS E INFORMAÇÕES DE CONTATO
                            </Text> 
                            <Text style={styles.text}>                                                        
                            Se você gostaria de acessar, corrigir, alterar ou excluir quaisquer informações pessoais que temos sobre você, registre uma queixa, ou simplesmente peça mais informações de contato a(o) nosso(a) Diretor(a) de privacidade através do contato@dec.com.br  ou pelo correio: DIGITAL ESTETHIC CENTER
                            </Text>
                            <Text style={styles.text}>                                                        
                            Fabiano M. Lenke
                            </Text> 
                            <Text style={styles.text}>                                                        
                            [Rua Dr. Amadeu da Luz, 122, sala 74, Blumenau, AC, 89010-160, Brazil]
                            </Text> 
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actions: {
            AuthActions: bindActionCreators(AuthActions, dispatch),
            apiActions: bindActionCreators(apiActions, dispatch),
            dispatch
        }
    };
};

export default connect(null, mapDispatchToProps)(Terms);
